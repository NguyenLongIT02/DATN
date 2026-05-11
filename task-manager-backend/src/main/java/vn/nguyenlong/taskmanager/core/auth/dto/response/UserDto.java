package vn.nguyenlong.taskmanager.core.auth.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String avatar;
}
