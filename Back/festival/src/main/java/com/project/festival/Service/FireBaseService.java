package com.project.festival.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.project.festival.Dto.FileDto;

@Service
public class FireBaseService {
//    private final String BUCKET = "viva-festival.appspot.com";
    
    // 파일 절대경로 설정
//    private final Resource resource = new ClassPathResource("viva-festival-firebase-adminsdk.json");

    private final String BUCKET = "viva-la-fiestas-21056.appspot.com";
    
    // 파일 절대경로 설정
    private final Resource resource = new ClassPathResource("viva-la-fiestas-21056-firebase-adminsdk-9betd-c77c420530.json");
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
	// FireBase에서 이미지 파일을 받아옴
    public String getImageFile(
    	String fileName
	) throws IOException {
        // FireBase 연동을 위해 인증 파일을 InputStream으로 읽어옴
        InputStream serviceAccount = resource.getInputStream();
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);

        // FireBase Storage 객체 생성
        Storage storage = StorageOptions.newBuilder()
                .setCredentials(credentials)
                .setProjectId("festivalTest")
                .build()
                .getService();

        // FireBase Storage에 접근
        BlobId blobId = BlobId.of(BUCKET, fileName);
        Blob blob = storage.get(blobId);
        
        return Base64.getEncoder().encodeToString(blob.getContent());
    }
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

     // 이미지를 FireBase에 업로드하는 메서드
     public void uploadImage(
 		FileDto dto
     ) throws IOException {
     	
         // FireBase 연동을 위해 인증 파일을 InputStream으로 읽어옴
         InputStream serviceAccount = resource.getInputStream();
         GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);

         // FireBase Storage 객체 생성
         Storage storage = StorageOptions.newBuilder()
             .setCredentials(credentials)
             .setProjectId("festivalTest")
             .build()
             .getService();
         
         Bucket bucket = storage.get(BUCKET);

         // FireBase Storage에 이미지 업로드
//       bucket.create(파일 이름, 원본 파일, 파일 타입);
         bucket.create(dto.getFileName(), Base64.getDecoder().decode(dto.getImgFile()), dto.getContentType());

         return;
     }
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
	// 이미지 삭제
    public void deleteImage(
    	FileDto dto
	) throws IOException {
    	
        // FireBase 연동을 위해 인증 파일을 InputStream으로 읽어옴
        InputStream serviceAccount = resource.getInputStream();
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);

        // FireBase Storage 객체 생성
        Storage storage = StorageOptions.newBuilder()
            .setCredentials(credentials)
            .setProjectId("festivalTest")
            .build()
            .getService();

        // FireBase Storage의 저장된 파일에 접근
        BlobId blobId = BlobId.of(BUCKET, dto.getFileName());

        // 해당 파일 삭제
        storage.delete(blobId);
    }
}
