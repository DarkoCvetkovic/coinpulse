#!/usr/bin/env python3

import argparse
import base64
import io
import os
import re
import sys
import zipfile
from pathlib import Path


PASSWORD_KEYS = (
    "STANDARD_PASSWORD",
    "LOCKED_PASSWORD",
    "ADMIN_PASSWORD",
)
PLAYWRIGHT_ARCHIVE = re.compile(
    rb'(<template id="playwrightReportBase64">data:application/zip;base64,)([^<]+)(</template>)',
    re.DOTALL,
)
REDACTED = b"[redacted]"


def password_values() -> dict[str, bytes]:
    return {
        key: value.encode()
        for key in PASSWORD_KEYS
        if (value := os.environ.get(key)) and len(value) >= 4
    }


def rewrite_archive(archive: bytes, passwords: dict[str, bytes]) -> tuple[bytes, int]:
    source = io.BytesIO(archive)
    destination = io.BytesIO()
    replacements = 0

    with zipfile.ZipFile(source) as input_zip:
        with zipfile.ZipFile(destination, "w") as output_zip:
            for entry in input_zip.infolist():
                content = input_zip.read(entry.filename)
                for password in set(passwords.values()):
                    replacements += content.count(password)
                    content = content.replace(password, REDACTED)
                output_zip.writestr(entry, content)

    return destination.getvalue(), replacements


def sanitize_playwright(report: Path, passwords: dict[str, bytes]) -> None:
    html = report.read_bytes()
    match = PLAYWRIGHT_ARCHIVE.search(html)
    if not match:
        raise ValueError(f"Playwright report archive not found: {report}")

    archive = base64.b64decode(match.group(2))
    sanitized_archive, replacements = rewrite_archive(archive, passwords)
    prefix = html[: match.start(2)]
    suffix = html[match.end(2) :]

    for password in set(passwords.values()):
        prefix = prefix.replace(password, REDACTED)
        suffix = suffix.replace(password, REDACTED)

    report.write_bytes(prefix + base64.b64encode(sanitized_archive) + suffix)
    print(f"Sanitized Playwright report: {replacements} replacement(s)")


def report_payloads(path: Path):
    content = path.read_bytes()
    yield content

    match = PLAYWRIGHT_ARCHIVE.search(content)
    if match:
        with zipfile.ZipFile(io.BytesIO(base64.b64decode(match.group(2)))) as archive:
            for entry in archive.infolist():
                yield archive.read(entry.filename)


def report_files(paths: list[Path]):
    for path in paths:
        if path.is_file():
            yield path
        elif path.is_dir():
            yield from (item for item in path.rglob("*") if item.is_file())


def check_reports(paths: list[Path], passwords: dict[str, bytes]) -> None:
    findings = []
    for path in report_files(paths):
        for payload in report_payloads(path):
            for key, password in passwords.items():
                if password in payload:
                    findings.append(f"{key} in {path}")

    if findings:
        raise ValueError("Password value found in public report: " + ", ".join(sorted(set(findings))))

    print("Public report password scan passed")


def main() -> int:
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(dest="command", required=True)

    sanitize_parser = subparsers.add_parser("sanitize-playwright")
    sanitize_parser.add_argument("report", type=Path)

    check_parser = subparsers.add_parser("check")
    check_parser.add_argument("paths", nargs="+", type=Path)

    args = parser.parse_args()
    passwords = password_values()
    if not passwords:
        raise ValueError("No password values were provided")

    if args.command == "sanitize-playwright":
        sanitize_playwright(args.report, passwords)
        check_reports([args.report], passwords)
    else:
        check_reports(args.paths, passwords)

    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, zipfile.BadZipFile) as error:
        print(error, file=sys.stderr)
        sys.exit(1)
