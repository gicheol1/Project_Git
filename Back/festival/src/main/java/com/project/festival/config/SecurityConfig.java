package com.project.festival.config;

import static org.springframework.security.config.Customizer.withDefaults;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.project.festival.Service.UserDetailsServiceImpl;
import com.project.festival.component.AuthEntryPoint;
import com.project.festival.component.AuthenticationFilter;

@Configuration
@EnableWebSecurity
// spring boot 버전 3.0.12부터는 'WebSecurityConfigurerAdapter' 사용 불가
public class SecurityConfig {
	
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	
	@Autowired
	private AuthenticationFilter authenticationFilter;
	
	@Autowired
	private AuthEntryPoint exceptionHandler;
	
	//CORS (Cross-Origin Resource Sharing) 구성 정의
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		
        // URL 기반의 CORS 구성 소스를 생성
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
		CorsConfiguration config = new CorsConfiguration();

        // 배포한 프론트 엔드 주소의 요청을 허용합니다.
		config.setAllowedOrigins(Arrays.asList(
			"http://localhost:3000",
//				"http://viva-la-fiesta-front.s3-website.ap-northeast-2.amazonaws.com",
				"https://viva-la-fiestas.com"
		));
		
		// 모든 HTTP 메서드, 해더 허용
		config.setAllowedMethods(Arrays.asList("*"));
		config.setAllowedHeaders(Arrays.asList("*"));
		
		// 자격 증명 (Credentials)을 허용 비활성화
		config.setAllowCredentials(false);
		
		config.applyPermitDefaultValues();

        // 모든 경로 (/**)에 대해 이 CORS 구성을 등록합니다.
		source.registerCorsConfiguration("/**", config);
		
		return source;
	}
	
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

    	// csrf 비활성화, cors활성화
        http.csrf(csrf -> csrf.disable()).cors(withDefaults())
        
        	// 세션 관리를 STATELESS로 설정
            .sessionManagement(management -> management
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            
            // 경로 허가 설정
            .authorizeHttpRequests(requests -> requests
        		// 모든 경로 허가
                .requestMatchers("/**").permitAll()
                
                // 그 외 모든 경로는 인증 필요
                .anyRequest().authenticated()
            )
            
            // 로그아웃 성공시 이동할 경로
            .logout(logout -> logout
            		.logoutSuccessUrl("/")
            )
            
            // 오류 발생시(인증 실패 및 토큰 만료)
            .exceptionHandling(handling -> handling
                .authenticationEntryPoint(exceptionHandler)
            )
            
            // AuthenticationFilter를 UsernamePasswordAuthenticationFilter 앞에 추가
            .addFilterBefore(
        		authenticationFilter, UsernamePasswordAuthenticationFilter.class
            );
		
		return http.build();
	}
	
    @Bean
    AuthenticationManager authenticationManagerBean() throws Exception {
        return new ProviderManager(Arrays.asList(authenticationProvider()));
    }
    
    @Bean
    DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
