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
			"성북 책모꼬지", 
			"성북구립도서관 데이터 분석과 키워드 조사를 통해 주민 관심사를 도출하여 '공존'과 '공생'을 테마로 이야기를 함께 나누는 축제의 장을 만들고자 한다. 자연과 인간, 미디어, 역사와 과학철학 등 다양한 분야의 전문가의 강연을 비롯하여 도서관을 기반으로 다양한 세대가 함께 즐기고 나눌 수 있는 프로그램, 시간과 공간을 넘어 만날 수 있는 온라인 콘텐츠를 다채롭게 즐길 수 있는 지식인문축제이다.", 
			"서울특별시 성북구 화랑로18자길 13 (상월곡동)",
			"2023-10-19", "2023-11-17", "축제", "서울"
		));
	
		festivalRepository.save(new Festival(
			"제 44회 서울무용제", 
			"공통 주제로 제시되는 현시대의 사회적 이슈와 예술 담론을 가장 혁신적으로 표현하며 대한민국 안무의 패러다임 변화를 모색하는 실험적 창작작품을 선정하는 경연", 
			"서울시 종로구 대학로 8길 7 아르코예술극장",
			"2023-11-21", "2023-11-23", "축제", "서울"
		));
		
		festivalRepository.save(new Festival(
			"서울거리공연 구석구석 라이브", "일년 내내 발길 닿는 어디든 서울 구석구석에서 만날 수 있는 거리예술공연이 광화문광장에서도 펼쳐집니다. ",
			"서울특별시 중구 세종대로 110",
			"2023-12-21", "2023-12-24", "공연행사", "서울"
		));
	
		festivalRepository.save(new Festival(
			"한국의집 고호재", 
			"한국의집에서 즐기는 프리미엄 궁중다과 고호재는 봄, 여름, 가을, 겨울 시즌별로 제철 재료 구성한 4계절의 다과상을 선보인다. 체험객은 고즈넉한 분위기의 전통 한옥 한국의집 소화당에서 정성스럽게 차려진 1인 다과상을 즐길 수 있다.",
			"서울특별시 중구 퇴계로36길 10 (필동2가) 한국의집 소화당",
			"2023-11-24", "2023-11-26","공연행사","서울"
		));
	
		festivalRepository.save(new Festival(
			"성북청춘불패영화제",
			"성북청춘불패영화제는 젊은 영화인들의 창작활동을 지지하며 2021년 첫발을 내디뎠습니다. 젊음이라는 공통의 조건 속에서 각자의 방식으로 세계를 바라보는 청춘들의 참신한 발상과 날카로운 시선, 그리고 빛나는 이들의 가능성을 발견하고자 하며 지금 이 순간 자신의 몫을 다하고 있는 이들의 불패함을 응원합니다.",
			"서울 성북구",
			"2023-11-09", "2023-11-15","문화","서울"
		));
		
		FilefestivalRepo.save(new FileFestival(1L, "festival/성북 책모꼬지.png", "성북 책모꼬지"));
		FilefestivalRepo.save(new FileFestival(2L, "festival/제44회 서울무용제.png", "제44회 서울무용제"));
		FilefestivalRepo.save(new FileFestival(3L, "festival/서울거리공연 구석구석 라이브.png", "서울거리공연 구석구석 라이브"));
		FilefestivalRepo.save(new FileFestival(4L, "festival/한국의집 고호재.png", "한국의집 고호재"));
		FilefestivalRepo.save(new FileFestival(5L, "festival/성북청춘불패영화제.png", "성북청춘불패영화제"));
		
		// ========== ========== ========== ========== ==========

		festivalRepository.save(new Festival(
			"유림공원",
			"올해로 14회째 진행되는 유성국화전시회는 2007년 유성구청 청사 내의 작은 행사로 시작됐다.",
			"대전 유성구 어은로 27 유림공원",
			"2023-10-13", "2023-11-05","축제","대전"
		));
		
		festivalRepository.save(new Festival(
			"2023 대전빵축제",
			"전국의 빵순이 빵돌이 들에게 너무나도 좋은 축제가 대전에서 열립니다.",
			"대전 중구 계백로1716번길 23 서대전광장야외음악당",
			"2023-10-28", "2023-10-29","축제","대전"
		));
		
		festivalRepository.save(new Festival(
			"대전동구 문화재야행",
			"",
			"목척교 수변공원",
			"2023-10-27", "2023-10-29","축제","대전"
		));
		
		festivalRepository.save(new Festival(
			"K-Hyo 페스타",
			"",
			"대전광역시 중구 뿌리공원로 47",
			"2023-10-13", "2023-10-15","축제","대전"
		));
		
		festivalRepository.save(new Festival(
			"서구힐링 아트페스티벌",
			"서구힐링 아트페스티벌은 예술을 품은 대전 서구, 서구 취하다라는 주제로, 최신트렌드를 반영하고 다양한 문화예술 프로그램으로 구성한 문화예술축제이다.",
			"대전광역시 서구 둔산서로 100 서구청",
			"2023-11-03", "2023-11-05","축제","대전"
		));
		
		FilefestivalRepo.save(new FileFestival(6L, "festival/유림공원.png", "유림공원"));
		FilefestivalRepo.save(new FileFestival(7L, "festival/2023 대전빵축제.png", "2023 대전빵축제"));
		FilefestivalRepo.save(new FileFestival(8L, "festival/대전동구 문화재야행.png", "대전동구 문화재야행"));
		FilefestivalRepo.save(new FileFestival(9L, "festival/K-Hyo 페스타.png", "K-Hyo 페스타"));
		FilefestivalRepo.save(new FileFestival(10L, "festival/서구힐링 아트페스티벌.png", "서구힐링 아트페스티벌"));
		
		// ========== ========== ========== ========== ==========
		
		festivalRepository.save(new Festival(
			"대구 음식산업 박람회",
			"",
			"대구 북구 엑스코로 10 대구전시컨벤션센터",
			"2023-11-23", "2023-11-25","축제","대구"
		));
		
		festivalRepository.save(new Festival(
			"E world 일루미네이션",
			"",
			"대구 달서구 두류공원로 200",
			"2023-11-18", "2024-02-20","축제","대구"
		));
		
		festivalRepository.save(new Festival(
			"PumpKin Festa",
			"",
			"대구 달서구 두류공원로 200",
			"2023-09-09", "2023-11-05","축제","대구"
		));
		
		festivalRepository.save(new Festival(
			"Dance ChampionShip",
			"",
			"대구광역시 중구 문화동 22",
			"2023-11-03", "2023-11-04","공연","대구"
		));
		
		festivalRepository.save(new Festival(
			"대구 인터네이션 오페라 페스티벌",
			"",
			"대구 북구 호암로 15 대구오페라하우스",
			"2023-10-06", "2023-11-10","공연","대구"
		));
		
		FilefestivalRepo.save(new FileFestival(11L, "festival/대구 음식산업 박람회.png", "대구 음식산업 박람회"));
		FilefestivalRepo.save(new FileFestival(12L, "festival/E world 일루미네이션.png", "E world 일루미네이션"));
		FilefestivalRepo.save(new FileFestival(13L, "festival/PumpKin Festa.png", "PumpKin Festa"));
		FilefestivalRepo.save(new FileFestival(14L, "festival/Dance ChampionShip.png", "Dance ChampionShip"));
		FilefestivalRepo.save(new FileFestival(15L, "festival/대구 인터네이션 오페라 페스티벌.png", "대구 인터네이션 오페라 페스티벌"));
		
		// ========== ========== ========== ========== ==========
		
		festivalRepository.save(new Festival(
			"2023 아세안요리 교실",
			"",
			"부산 해운대구 좌동로 162 아세안문화원",
			"2023-09-01", "2023-11-18","축제","부산"
		));
		
		festivalRepository.save(new Festival(
			"통영수산식품대전",
			"",
			"부산 해운대구 APEC로 55 벡스코",
			"2023-11-09", "2023-11-11","축제","부산"
		));
		
		festivalRepository.save(new Festival(
			"2023 International Ki Sports Festival",
			"",
			"부산 해운대구 APEC로 55 벡스코",
			"2023-10-06", "2023-11-10","공연","부산"
		));
		
		festivalRepository.save(new Festival(
			"2023 글로벌 영도커피페스티벌",
			"",
			"부산 영도구 해양로301번길 55",
			"2023-11-03", "2023-11-05","문화","부산"
		));
		
		festivalRepository.save(new Festival(
			"Millac Beer Week",
			"",
			"부산 수영구 민락수변로17번길 56",
			"2023-11-03", "2023-11-05","축제","부산"
		));
		
		FilefestivalRepo.save(new FileFestival(17L, "festival/통영수산식품대전.png", "통영수산식품대전"));
		FilefestivalRepo.save(new FileFestival(18L, "festival/2023 International Ki Sports Festival.png", "2023 International Ki Sports Festival"));
		FilefestivalRepo.save(new FileFestival(19L, "festival/2023 글로벌 영도커피페스티벌.png", "2023 글로벌 영도커피페스티벌"));

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
		
		fileTravalPackRepo.save(new FileTravalPack(1L, "travalPack/패키지사진1.png", "패키지사진1"));
		fileTravalPackRepo.save(new FileTravalPack(2L, "travalPack/패키지사진2.png", "패키지사진2"));
		fileTravalPackRepo.save(new FileTravalPack(3L, "travalPack/패키지사진3.png", "패키지사진3"));
		fileTravalPackRepo.save(new FileTravalPack(4L, "travalPack/패키지사진4.png", "패키지사진4"));
		fileTravalPackRepo.save(new FileTravalPack(5L, "travalPack/패키지사진5.png", "패키지사진5"));
		fileTravalPackRepo.save(new FileTravalPack(6L, "travalPack/패키지사진6.png", "패키지사진6"));
		fileTravalPackRepo.save(new FileTravalPack(7L, "travalPack/패키지사진7.png", "패키지사진7"));
		fileTravalPackRepo.save(new FileTravalPack(8L, "travalPack/패키지사진8.png", "패키지사진8"));
		fileTravalPackRepo.save(new FileTravalPack(9L, "travalPack/패키지사진9.png", "패키지사진9"));
		fileTravalPackRepo.save(new FileTravalPack(10L, "travalPack/패키지사진10.png", "패키지사진10"));
		fileTravalPackRepo.save(new FileTravalPack(11L, "travalPack/패키지사진11.png", "패키지사진11"));
		fileTravalPackRepo.save(new FileTravalPack(12L, "travalPack/패키지사진12.png", "패키지사진12"));
		fileTravalPackRepo.save(new FileTravalPack(13L, "travalPack/패키지사진13.png", "패키지사진13"));
		fileTravalPackRepo.save(new FileTravalPack(14L, "travalPack/패키지사진14.png", "패키지사진14"));
		fileTravalPackRepo.save(new FileTravalPack(15L, "travalPack/패키지사진15.png", "패키지사진15"));
		
		
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        
        for(int i=15; i>=10; i--) {
    		blackListRepo.save(new BlackList(userRepository.findById("user"+i),"사유 "+i));
        }
		
	}
	
}
