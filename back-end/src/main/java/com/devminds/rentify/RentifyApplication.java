package com.devminds.rentify;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RentifyApplication {

	@PostConstruct
	public void setup() {
		Stripe.apiKey = "sk_test_51OcpzgGAUVgXgq0ONlbbyYZe2l1TwIico5pxExqjnI9aJohhRiMZjdUc7VluBEajW85KsyETv6PygE6WdcvTC5jY001uSdQMTU";
	}

	public static void main(String[] args) {
		SpringApplication.run(RentifyApplication.class, args);
	}

}
