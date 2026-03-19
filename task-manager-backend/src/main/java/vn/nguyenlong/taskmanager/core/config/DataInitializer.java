package vn.nguyenlong.taskmanager.core.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import vn.nguyenlong.taskmanager.core.auth.entity.Role;
import vn.nguyenlong.taskmanager.core.auth.entity.User;
import vn.nguyenlong.taskmanager.core.auth.entity.UserRole;
import vn.nguyenlong.taskmanager.core.auth.enums.AccountStatus;
import vn.nguyenlong.taskmanager.core.auth.enums.RoleType;
import vn.nguyenlong.taskmanager.core.auth.repository.RoleRepository;
import vn.nguyenlong.taskmanager.core.auth.repository.UserRepository;
import vn.nguyenlong.taskmanager.core.auth.repository.UserRoleRepository;
import vn.nguyenlong.taskmanager.scrumboard.entity.LabelEntity;
import vn.nguyenlong.taskmanager.scrumboard.repository.LabelRepository;


@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final LabelRepository labelRepository;

    @Override
    @Transactional
    public void run(String... args) {
        log.info("================================================================================");
        log.info("Starting Data Initialization...");
        log.info("================================================================================");

        initializeRoles();
        initializeAdminUser();
        initializeLabels();

        log.info("================================================================================");
        log.info("Data Initialization Completed Successfully");
        log.info("================================================================================");
    }

    /**
     * Initialize default roles if they don't exist
     */
    private void initializeRoles() {
        log.info("Checking roles...");

        // Check each role individually to prevent duplicates
        if (roleRepository.findByName(RoleType.ADMIN) == null) {
            log.info("ADMIN role not found. Creating ADMIN role...");
            Role adminRole = new Role();
            adminRole.setName(RoleType.ADMIN);
            adminRole.setCreatedBy("system");
            adminRole.setUpdatedBy("system");
            roleRepository.save(adminRole);
            log.info("✓ Created role: ADMIN (ID: {})", adminRole.getId());
        } else {
            log.info("ADMIN role already exists. Skipping.");
        }

        if (roleRepository.findByName(RoleType.USER) == null) {
            log.info("USER role not found. Creating USER role...");
            Role userRole = new Role();
            userRole.setName(RoleType.USER);
            userRole.setCreatedBy("system");
            userRole.setUpdatedBy("system");
            roleRepository.save(userRole);
            log.info("✓ Created role: USER (ID: {})", userRole.getId());
        } else {
            log.info("USER role already exists. Skipping.");
        }

        log.info("Role initialization completed. Total roles: {}", roleRepository.count());
    }

    /**
     * Initialize default admin user if it doesn't exist
     */
    private void initializeAdminUser() {
        log.info("Checking admin user...");

        // Check if admin user already exists
        if (userRepository.findByUsername("admin").isPresent()) {
            log.info("Admin user already exists. Skipping admin user initialization.");
            return;
        }

        log.info("No admin user found. Creating default admin user...");

        // Get ADMIN role
        Role adminRole = roleRepository.findByName(RoleType.ADMIN);
        if (adminRole == null) {
            log.error("ADMIN role not found! Cannot create admin user.");
            log.error("Please ensure roles are initialized first.");
            return;
        }

        // Create admin user
        User adminUser = User.builder()
                .username("admin")
                .email("admin@taskmanager.com")
                .password(passwordEncoder.encode("admin123"))
                .fullName("System Administrator")
                .isVerified(true)
                .status(AccountStatus.ACTIVE)
                .build();
        
        adminUser.setCreatedBy("system");
        adminUser.setUpdatedBy("system");
        
        User savedAdmin = userRepository.save(adminUser);
        log.info("✓ Created admin user: {} (ID: {})", savedAdmin.getUsername(), savedAdmin.getId());

        // Assign ADMIN role to admin user
        UserRole userRole = UserRole.builder()
                .userId(savedAdmin.getId())
                .roleId(adminRole.getId())
                .build();
        
        userRole.setCreatedBy("system");
        userRole.setUpdatedBy("system");
        
        userRoleRepository.save(userRole);
        log.info("✓ Assigned ADMIN role to admin user");

        log.info("Default admin user initialized successfully");
        log.info("Admin credentials:");
        log.info("  Username: admin");
        log.info("  Email: admin@taskmanager.com");
        log.info("  Password: admin123");
        log.info("IMPORTANT: Please change the default password after first login!");
    }

    /**
     * Initialize default labels if they don't exist
     */
    private void initializeLabels() {
        log.info("Checking labels...");

        if (labelRepository.count() > 0) {
            log.info("Labels already exist. Skipping label initialization.");
            return;
        }

        log.info("No labels found. Creating default labels...");

        // Define default labels with colors
        String[][] defaultLabels = {
            {"Bug", "#f44336"},           // Red
            {"Feature", "#2196f3"},       // Blue
            {"Enhancement", "#4caf50"},   // Green
            {"Documentation", "#ff9800"}, // Orange
            {"Design", "#9c27b0"},        // Purple
            {"Testing", "#00bcd4"},       // Cyan
            {"High Priority", "#e91e63"}, // Pink
            {"Low Priority", "#607d8b"}   // Blue Grey
        };

        for (String[] labelData : defaultLabels) {
            LabelEntity label = new LabelEntity();
            label.setName(labelData[0]);
            label.setColor(labelData[1]);
            label.setCreatedBy("system");
            label.setUpdatedBy("system");
            
            LabelEntity savedLabel = labelRepository.save(label);
            log.info("✓ Created label: {} with color {} (ID: {})", 
                    savedLabel.getName(), savedLabel.getColor(), savedLabel.getId());
        }

        log.info("Label initialization completed. Total labels: {}", labelRepository.count());
    }
}
