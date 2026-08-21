package jobpilot.backend.controller;


import jakarta.validation.Valid;
import jobpilot.backend.dto.AuthResponse;
import jobpilot.backend.dto.LoginRequest;
import jobpilot.backend.dto.RegisterRequest;
import jobpilot.backend.entity.User;
import jobpilot.backend.repository.UserRepository;
import jobpilot.backend.security.CustomUserDetailsService;
import jobpilot.backend.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService;

    public AuthController(UserRepository userRepository , PasswordEncoder passwordEncoder , JwtUtil jwtUtil , AuthenticationManager authenticationManager, CustomUserDetailsService customUserDetailsService){
        this.jwtUtil=jwtUtil;
        this.authenticationManager=authenticationManager;
        this.passwordEncoder=passwordEncoder;
        this.userRepository=userRepository;
        this.customUserDetailsService = customUserDetailsService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse registerUser(@RequestBody @Valid RegisterRequest request){
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is Already Present");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);

        UserDetails userDetails = customUserDetailsService
                .loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .name(user.getName())
                .build();
    }

    @PostMapping("/login")
    public AuthResponse loginUser(@RequestBody @Valid LoginRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        UserDetails userDetails = customUserDetailsService
                .loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .name(user.getName())
                .build();
    }

}
