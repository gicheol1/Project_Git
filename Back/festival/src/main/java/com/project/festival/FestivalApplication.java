package com.project.festival;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.project.festival.Constant.IsPrivated;
import com.project.festival.Constant.Role;
import com.project.festival.Entity.BlackList;
import com.project.festival.Entity.User;
import com.project.festival.Entity.Repo.BlackListRepo;
import com.project.festival.Entity.Repo.UserRepo;
import com.project.festival.Entity.TravalPack.FileTravalPack;
import com.project.festival.Entity.TravalPack.Repo.FileTravalPackRepo;
import com.project.festival.Entity.board.Comm.CommentFree;
import com.project.festival.Entity.board.Entity.BoardFree;
import com.project.festival.Entity.board.Entity.BoardQA;
import com.project.festival.Entity.board.Repository.BoardFreeRepo;
import com.project.festival.Entity.board.Repository.BoardQARepo;
import com.project.festival.Entity.board.RepositoryComm.CommentFreeRepo;
import com.project.festival.Entity.festival.Festival;
import com.project.festival.Entity.festival.FestivalRepo;
import com.project.festival.Entity.festival.FileFestival;
import com.project.festival.Entity.festival.FileFestivalRepo;
import com.project.festival.Service.TravalPack.PackReservationService;
import com.project.festival.Service.TravalPack.PaymentService;

import lombok.RequiredArgsConstructor;

@SpringBootApplication
@RequiredArgsConstructor
/* @RequiredArgsConstructor 
 * - @Autowired를 사용하지 않고 의존성 주입 
 * - 초기화 되지않은 final 필드나, @NonNull 이 붙은 필드에 대해 생성자를 생성
 */
public class FestivalApplication implements CommandLineRunner {

    /* 테스트용 사용자와 관리자 */
	private final UserRepo userRepository;

    /* 테스트용 축제 */
	private final FestivalRepo festivalRepository;
	private final FileFestivalRepo FilefestivalRepo;

    /* 테스트용 게시판과 댓글(자유) */
    private final BoardFreeRepo BFRepo;
    private final CommentFreeRepo CFRepo;

    /* 테스트용 게시판(QA) */
    private final BoardQARepo BQARepo;
	
    /* 테스트용 계정의 비밀번호 암호화 */
	private final PasswordEncoder passwordEncoder;
	
	private final FileTravalPackRepo fileTravalPackRepo;
	
	/* 테스트용 결제 내역 생성 */
	private final PaymentService paymentService;
	
	/* 패키지 여행 예약(예약 내역) 생성 */
	private final PackReservationService packReservationService;
	
	private final BlackListRepo blackListRepo;
	
	Random rand = new Random();

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	public static void main(String[] args) {
		SpringApplication.run(FestivalApplication.class, args);
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	@Override
	public void run(String... args) throws Exception {

		// 테스트용 계정
		List<User> user = new ArrayList<>();
		
		// 어드민
		user.add(new User (
				"admin", passwordEncoder.encode("admin"),
				"관리자", "010-1337-8282", "1987-01-01", "Admin@mail.com",
				"대전", "서구", "Admin ", "2023-11-20", Role.ADMIN
		));
		
		// 사용자
		for (int i=1; i<16; i++) {
			
			user.add(new User (
					"user"+i, passwordEncoder.encode("user"+i),
					"사용자"+i, "010-1234-5678", (i<10) ? "2000-01-0"+i : "2000-01-"+i, "test"+i+"@mail.com",
					"대전", "서구", "동서대로 "+i, (i<10) ? "2023-10-0"+i : "2023-10-"+i, Role.USER
			));
		}
		
		for (int i=0; i<user.size(); i++) {
			userRepository.save(user.get(i));
		}
		
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
		festivalRepository.save(new Festival(
			"롯데월드 miracle winter", "test1", "서울시 송파구",
			"2023-02-25", "2023-11-25", "축제", "서울"
		));
	
		festivalRepository.save(new Festival(
			"ㅊ ㅊ-하다 페스티벌", "test2", "서울시 종로구",
			"2023-11-16", "2023-11-20", "축제", "서울"
		));
		
		festivalRepository.save(new Festival(
			"서울일러스트레이션페어V.16", "test3", "서울 강남구",
			"2023-12-21", "2023-12-24", "공연/행사", "서울"
		));
//	
//		festivalRepository.save(new Festival(
//			"대한민국 우리술 대축제", "test4", "서울 서초구",
//			"2023-11-24", "2023-11-26"
//		));
//	
//		festivalRepository.save(new Festival(
//			"2023 광화문광장마켓","test5", "서울특별시 종로구 세종대로 175",
//			"2023-12-15", "2024-01-21"
//		));
		
		FilefestivalRepo.save(new FileFestival(1L, "festival/롯데월드 miracle winter.png", "롯데월드 miracle winter"));
		FilefestivalRepo.save(new FileFestival(2L, "festival/ㅊ ㅊ-하다 페스티벌.png", "ㅊ ㅊ-하다 페스티벌"));
		FilefestivalRepo.save(new FileFestival(3L, "festival/서울일러스트레이션페어V.16.png", "서울일러스트레이션페어V.16"));
		
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
		
		rand.setSeed(System.currentTimeMillis());
		
		int boardCnt = 1+rand.nextInt(10);
		
		BFRepo.save(new BoardFree(
				"user5",
				"자유 제목 1",
				"자유 내용 1"
		));

		for(int i=2; i<boardCnt; i++) {
			BFRepo.save(new BoardFree(
					user.get(1+rand.nextInt(user.size()-2)).getMemId(),
					"자유 제목 "+i,
					"자유 내용 "+i
			));
		}
//
//	// ========== ========== ========== ========== ==========
//
		rand.setSeed(System.currentTimeMillis());
		
		boardCnt = 1+rand.nextInt(10);
		
		for(int i=1; i<boardCnt; i++) {
			BQARepo.save(new BoardQA(
					user.get(1+rand.nextInt(user.size()-2)).getMemId(),
					"QA 제목 "+i,
					"QA 내용 "+i,
					rand.nextBoolean() ? IsPrivated.Y : IsPrivated.N
			));
		}
		
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
		
		CFRepo.save(new CommentFree(null, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "댓글 1", true));
		CFRepo.save(new CommentFree(null, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "댓글 2"));
		CFRepo.save(new CommentFree(null, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "댓글 3"));
		CFRepo.save(new CommentFree(null, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "댓글 4"));
		CFRepo.save(new CommentFree(null, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "댓글 5"));
		CFRepo.save(new CommentFree(null, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "댓글 6"));
		CFRepo.save(new CommentFree(null, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "댓글 7"));

		CFRepo.save(new CommentFree(1L, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "답글 1-1"));
		CFRepo.save(new CommentFree(1L, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "답글 1-2"));
		CFRepo.save(new CommentFree(1L, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "답글 1-3"));
		CFRepo.save(new CommentFree(8L, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "답글 1-1-1"));

		CFRepo.save(new CommentFree(3L, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "답글 3-1"));
		CFRepo.save(new CommentFree(3L, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "답글 3-2"));

		CFRepo.save(new CommentFree(6L, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "답글 6-1"));
		CFRepo.save(new CommentFree(14L, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "답글 6-1-1"));

		CFRepo.save(new CommentFree(1L, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "답글 1-4"));
		CFRepo.save(new CommentFree(1L, user.get(1+rand.nextInt(user.size()-2)).getMemId(), 1L, "답글 1-5"));
		
		/* (테스트용) 패키지 여행 예약(예약 내역) 생성 */
		packReservationService.createDefaultPackReservations();
		
		/* (테스트용) 결재내역 생성 */
		paymentService.creatDefaultPaymemt();
		
		fileTravalPackRepo.save(new FileTravalPack(2L, "travalPack/고양이1.png", "고양이1"));
		fileTravalPackRepo.save(new FileTravalPack(3L, "travalPack/고양이2.png", "고양이2"));
		fileTravalPackRepo.save(new FileTravalPack(4L, "travalPack/고양이3.png", "고양이3"));
		fileTravalPackRepo.save(new FileTravalPack(5L, "travalPack/고양이4.png", "고양이4"));
		
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        
        for(int i=15; i>=10; i--) {
    		blackListRepo.save(new BlackList(userRepository.findById("user"+i),"사유 "+i));
        }
		
	}
	
}
