package com.project.festival.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
/*
 * - 설정파일을 만들기 위한 애노테이션 or Bean을 등록하기 위한 애노테이션이다.
 */
public class ModelMapperConfig { // 엔티티랑 DTO를 왔다갔다 변환해줌
    @Bean
	/* <@Bean>
	 * - 개발자가 직접 제어가 불가능한 외부 라이브러리등을 Bean으로 만들려할 때 사용된다.
	 */
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
    
    /* <ModelMapper 란?>
     * - entity와 dto의 변환에 사용하는 것 
     * - 서로 다른 object 간의 필드 값을 자동으로 mapping 해주는 library
     */    
}

/* <참고사이트>
 * - https://squirmm.tistory.com/entry/Spring-modelMapper 
 */
