package com.project.festival.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.project.festival.Entity.board.FileDto;

@Service
public class FireBaseService {
    private final String BUCKET = "festivaltest-937ab.appspot.com";
    private final String ACCOUNT = "src/main/resources/festivaltest-firebase-adminsdk.json";
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    // 이미지를 FireBase에 업로드하는 메서드
    public FileDto uploadImage(
    	String target,
		MultipartFile file
    ) throws IOException {
    	
        // FireBase 연동을 위해 인증 파일을 FileInputStream으로 읽어옴
        FileInputStream serviceAccount = new FileInputStream(ACCOUNT);
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);

        // FireBase Storage 객체 생성
        Storage storage = StorageOptions.newBuilder()
            .setCredentials(credentials)
            .setProjectId("festivalTest")
            .build()
            .getService();
        
        Bucket bucket = storage.get(BUCKET);
        
        StringBuilder sb = new StringBuilder();
        sb.append(target);
        sb.append('/');

        // 이미지 파일에 랜덤한 이름 부여
        String fileName = UUID.randomUUID().toString();
        sb.append(fileName);

        // FireBase Storage에 이미지 업로드
        bucket.create(sb.toString(), file.getBytes(), file.getContentType());

        // 이미지 원본 다운로드
        BlobId blobId = BlobId.of(BUCKET, sb.toString());
        Blob blob = storage.get(blobId);
        
        // 원본과 이름을 반환하기 위한 객체
        FileDto fd = new FileDto();
        
        fd.setImgFile(Base64.getEncoder().encodeToString(blob.getContent()));
        fd.setFileName(fileName);

        return fd;
    }

    // 축제 이미지를 업로드
    public FileDto uploadImageFestival(
		MultipartFile file
    ) throws IOException {
    	
        // FireBase 연동을 위해 인증 파일을 FileInputStream으로 읽어옴
        FileInputStream serviceAccount = new FileInputStream(ACCOUNT);
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);

        // FireBase Storage 객체 생성
        Storage storage = StorageOptions.newBuilder()
            .setCredentials(credentials)
            .setProjectId("festivalTest")
            .build()
            .getService();
        
        Bucket bucket = storage.get(BUCKET);
        
        StringBuilder sb = new StringBuilder();
        sb.append("festival/");

        // 이미지 파일에 랜덤한 이름 부여
        String fileName = UUID.randomUUID().toString();
        sb.append(fileName);

        // FireBase Storage에 이미지 업로드
        bucket.create(sb.toString(), file.getBytes(), file.getContentType());

        // 이미지 원본 다운로드
        BlobId blobId = BlobId.of(BUCKET, sb.toString());
        Blob blob = storage.get(blobId);
        
        // 원본과 이름을 반환하기 위한 객체
        FileDto fd = new FileDto();
        
        fd.setImgFile(Base64.getEncoder().encodeToString(blob.getContent()));
        fd.setFileName(fileName);

        return fd;
    }
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    // FireBase에서 이미지 URL을 가져오는 메서드
//    public String getImageUrl(
//    	String target,
//		String fileName
//    ) throws IOException {
//    	
//        // FireBase 연동을 위해 인증 파일을 FileInputStream으로 읽어옴
//        FileInputStream serviceAccount = new FileInputStream(ACCOUNT);
//        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
//
//        // FireBase Storage 객체 생성
//        Storage storage = StorageOptions.newBuilder()
//            .setCredentials(credentials)
//            .setProjectId("festivalTest")
//            .build()
//            .getService();
//        
//        StringBuilder sb = new StringBuilder();
//        sb.append(target);
//        sb.append('/');
//        sb.append(fileName);
//
//        BlobId blobId = BlobId.of(BUCKET, sb.toString());
//        Blob blob = storage.get(blobId);
//
//        // FireBase Storage에서 이미지 다운로드 URL 가져오기
//        if (blob != null) {
//            return blob.signUrl(1, TimeUnit.DAYS).toString();
//            
//        }
//        
//        return null;
//    }
    
	// FireBase에서 이미지 파일을 받아옴
    public FileDto getImageFile(
    	String target,
    	String fileName
	) throws IOException {
        // FireBase 연동을 위해 인증 파일을 FileInputStream으로 읽어옴
        FileInputStream serviceAccount = new FileInputStream(ACCOUNT);
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);

        // FireBase Storage 객체 생성
        Storage storage = StorageOptions.newBuilder()
                .setCredentials(credentials)
                .setProjectId("festivalTest")
                .build()
                .getService();
        
        StringBuilder sb = new StringBuilder();
        sb.append(target);
        sb.append('/');
        sb.append(fileName);

        BlobId blobId = BlobId.of(BUCKET, sb.toString());
        Blob blob = storage.get(blobId);

        // 원본과 이름 반환
        FileDto fd = new FileDto();
        
        fd.setImgFile(Base64.getEncoder().encodeToString(blob.getContent()));
        fd.setFileName(fileName);
        
        return fd;
    }
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
	// 이미지를 FireBase에서 삭제하는 메서드
    public void deleteImage(
    	String target,
		String fileName
	) throws IOException {
    	
        // FireBase 연동을 위해 인증 파일을 FileInputStream으로 읽어옴
        FileInputStream serviceAccount = new FileInputStream(ACCOUNT);
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);

        // FireBase Storage 객체 생성
        Storage storage = StorageOptions.newBuilder()
            .setCredentials(credentials)
            .setProjectId("festivalTest")
            .build()
            .getService();
        
        StringBuilder sb = new StringBuilder();
        sb.append(target);
        sb.append('/');
        sb.append(fileName);

        BlobId blobId = BlobId.of(BUCKET, sb.toString());

        // FireBase Storage에서 해당 Blob 삭제
        storage.delete(blobId);
    }
    
	// 축제 이미지 삭제
    public void deleteImageFestival(
		String fileName
	) throws IOException {
    	
        // FireBase 연동을 위해 인증 파일을 FileInputStream으로 읽어옴
        FileInputStream serviceAccount = new FileInputStream(ACCOUNT);
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);

        // FireBase Storage 객체 생성
        Storage storage = StorageOptions.newBuilder()
            .setCredentials(credentials)
            .setProjectId("festivalTest")
            .build()
            .getService();
        
        StringBuilder sb = new StringBuilder();
        sb.append("festival/");
        sb.append(fileName);

        BlobId blobId = BlobId.of(BUCKET, sb.toString());

        // FireBase Storage에서 해당 Blob 삭제
        storage.delete(blobId);
    }
}
