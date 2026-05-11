package vn.nguyenlong.taskmanager.core.auth.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.nguyenlong.taskmanager.core.auth.entity.User;
import vn.nguyenlong.taskmanager.core.auth.repository.UserRepository;
import vn.nguyenlong.taskmanager.core.entity.SuccessResponse;
import vn.nguyenlong.taskmanager.core.util.ResponseUtil;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
@Tag(name = "User Controller", description = "API endpoints for user directory")
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/search")
    @Operation(summary = "Search users", description = "Search users by email or full name for invitations")
    public SuccessResponse<List<UserSearchResponse>> searchUsers(@RequestParam String query) {
        if (query == null || query.trim().length() < 2) {
            return ResponseUtil.ok(HttpStatus.OK.value(), "Success", List.of());
        }

        List<User> users = userRepository.findByEmailContainingIgnoreCaseOrFullNameContainingIgnoreCase(query, query);
        
        List<UserSearchResponse> response = users.stream()
                .map(user -> UserSearchResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .fullName(user.getFullName())
                        .username(user.getUsername())
                        .build())
                .collect(Collectors.toList());

        return ResponseUtil.ok(HttpStatus.OK.value(), "Success", response);
    }

    @lombok.Data
    @lombok.Builder
    public static class UserSearchResponse {
        private Long id;
        private String email;
        private String fullName;
        private String username;
    }
}
