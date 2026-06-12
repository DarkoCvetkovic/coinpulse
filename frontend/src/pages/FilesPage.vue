<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { coinsApi } from '../api/coinsApi'
import { filesApi, saveBlob } from '../api/filesApi'
import { useAuthStore } from '../stores/auth'
import BaseButton from '../components/common/BaseButton.vue'
import BaseCard from '../components/common/BaseCard.vue'
import BaseSelect from '../components/common/BaseSelect.vue'
import ErrorAlert from '../components/common/ErrorAlert.vue'
import SuccessAlert from '../components/common/SuccessAlert.vue'

const auth = useAuthStore()

// --- Upload state ---
const coins = ref([])
const selectedCoinId = ref('')
const selectedFile = ref(null)
const previewUrl = ref(null)
const dragActive = ref(false)
const uploading = ref(false)
const uploadError = ref('')
const uploadSuccess = ref('')
const fileInput = ref(null)

// --- Download state ---
const downloading = ref(false)
const downloadSuccess = ref('')
const downloadError = ref('')

onMounted(async () => {
  const data = await coinsApi.list({ size: 100, sort: 'rank,asc' })
  coins.value = data.content
})

onBeforeUnmount(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
})

const coinOptions = computed(() =>
  coins.value.map((coin) => ({ value: String(coin.id), label: `${coin.name} (${coin.symbol})` }))
)

function acceptFile(file) {
  uploadError.value = ''
  uploadSuccess.value = ''
  if (!file) return
  if (!['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'].includes(file.type)) {
    uploadError.value = 'File must be a png, jpeg, svg or webp image.'
    return
  }
  if (file.size > 1_000_000) {
    uploadError.value = 'File must be at most 1 MB.'
    return
  }
  selectedFile.value = file
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = URL.createObjectURL(file)
}

function onFilePicked(event) {
  acceptFile(event.target.files[0])
}

function onDrop(event) {
  dragActive.value = false
  acceptFile(event.dataTransfer.files[0])
}

async function handleUpload() {
  uploadError.value = ''
  uploadSuccess.value = ''
  if (!selectedCoinId.value) {
    uploadError.value = 'Pick a coin first.'
    return
  }
  if (!selectedFile.value) {
    uploadError.value = 'Pick an image first.'
    return
  }
  uploading.value = true
  try {
    const coin = await filesApi.uploadLogo(selectedCoinId.value, selectedFile.value)
    uploadSuccess.value = `Logo uploaded for ${coin.name} - now served from ${coin.logoUrl}.`
    selectedFile.value = null
  } catch (err) {
    uploadError.value =
      err.response?.data?.message ?? 'Upload failed. Please try again.'
  } finally {
    uploading.value = false
  }
}

async function handleDownload(format) {
  downloadError.value = ''
  downloadSuccess.value = ''
  downloading.value = true
  try {
    const blob = await filesApi.exportPortfolio(format)
    saveBlob(blob, `portfolio.${format}`)
    downloadSuccess.value = `portfolio.${format} downloaded - check your Downloads folder.`
  } catch {
    downloadError.value = 'Download failed. Please try again.'
  } finally {
    downloading.value = false
  }
}
</script>

<template>
  <div class="container files" data-testid="files-page">
    <h1 class="files__title">Files</h1>

    <BaseCard title="Upload a coin logo" test-id="upload-card">
      <template v-if="auth.isAdmin">
        <div class="files__upload">
          <SuccessAlert v-if="uploadSuccess" :message="uploadSuccess" test-id="upload-success" />
          <ErrorAlert v-if="uploadError" :message="uploadError" test-id="upload-error" />

          <BaseSelect
            v-model="selectedCoinId"
            label="Coin"
            :options="coinOptions"
            placeholder="Select a coin..."
            test-id="upload-coin"
          />

          <div
            class="files__dropzone"
            :class="{ 'files__dropzone--active': dragActive }"
            data-testid="upload-dropzone"
            @click="fileInput.click()"
            @dragover.prevent="dragActive = true"
            @dragleave="dragActive = false"
            @drop.prevent="onDrop"
          >
            <template v-if="previewUrl">
              <img :src="previewUrl" alt="Logo preview" class="files__preview" data-testid="upload-preview" />
              <span class="text-muted">{{ selectedFile?.name ?? 'Ready to upload' }}</span>
            </template>
            <template v-else>
              <span class="files__dropzone-icon" aria-hidden="true">⬆</span>
              <span>Drop an image here or click to browse</span>
              <span class="text-muted">png, jpeg, svg or webp - max 1 MB</span>
            </template>
            <input
              ref="fileInput"
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              class="files__input"
              data-testid="upload-input"
              @change="onFilePicked"
            />
          </div>

          <BaseButton
            :loading="uploading"
            :disabled="!selectedFile || !selectedCoinId"
            test-id="upload-submit"
            @click="handleUpload"
          >
            Upload logo
          </BaseButton>
        </div>
      </template>
      <p v-else class="text-muted" data-testid="upload-admin-only">
        Logo upload is an admin action. Sign in as <code>admin</code> to try it.
      </p>
    </BaseCard>

    <BaseCard title="Download your portfolio" test-id="download-card">
      <div class="files__download">
        <SuccessAlert v-if="downloadSuccess" :message="downloadSuccess" test-id="download-success" />
        <ErrorAlert v-if="downloadError" :message="downloadError" test-id="download-error" />
        <p class="text-muted">
          Export all your transactions as a file - the same data you see on the Dashboard.
        </p>
        <div class="files__download-buttons">
          <BaseButton :loading="downloading" test-id="download-csv" @click="handleDownload('csv')">
            Download CSV
          </BaseButton>
          <BaseButton
            variant="secondary"
            :loading="downloading"
            test-id="download-json"
            @click="handleDownload('json')"
          >
            Download JSON
          </BaseButton>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
.files {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 640px;
}

.files__title {
  font-size: 24px;
}

.files__upload {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.files__dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 160px;
  padding: 20px;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius);
  cursor: pointer;
  text-align: center;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.files__dropzone:hover,
.files__dropzone--active {
  border-color: var(--color-primary);
  background: rgba(99, 102, 241, 0.06);
}

.files__dropzone-icon {
  font-size: 26px;
}

.files__input {
  display: none;
}

.files__preview {
  max-width: 96px;
  max-height: 96px;
  border-radius: var(--radius);
}

.files__download {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.files__download-buttons {
  display: flex;
  gap: 10px;
}
</style>
