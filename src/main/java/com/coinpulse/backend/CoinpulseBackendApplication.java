package com.coinpulse.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

// VIA_DTO gives Page responses a stable JSON structure (content/page) that API tests can rely on.
@SpringBootApplication
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
public class CoinpulseBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoinpulseBackendApplication.class, args);
	}

}
