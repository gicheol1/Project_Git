package com.project.festival.config;

import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartFile;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FireBaseInitializer {
	
    public void uploadImageToFirebaseStorage(
		MultipartFile file
    ) throws IOException {
		FileInputStream serviceAccountFile = new FileInputStream(
			"src/main/resources/festivaltest-firebase-adminsdk.json"
		);
		
		FirebaseOptions options = FirebaseOptions
	        .builder()
	        .setCredentials(GoogleCredentials.fromStream(serviceAccountFile))
	        .setDatabaseUrl("https://festivaltest-90db3.appspot.com")
	        .build();
		
		FirebaseApp.initializeApp(options);
    }
}
