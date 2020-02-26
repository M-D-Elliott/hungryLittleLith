package com.sg.hungrylillithrestservice.model;

import com.sg.hungrylillithrestservice.controller.request.RegisterPlayerRequest;
import com.sg.hungrylillithrestservice.service.Validations;
import java.time.LocalDate;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class Player {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int ID;

    @NotNull(message = "User name is required.")
    @NotBlank(message = "User name is required.")
    @Size(min = 8, max = 30, message = "User name must be between 8 and 30 characters")
    String userName;

    @NotNull(message = "Email address is required.")
    @NotBlank(message = "Email address is required.")
    @Size(min = 8, max = 20, message = "Email must be between 8 and 255 characters")
    @Pattern(regexp = Validations.EMAIL_REGEX, message = "Email must be in valid something@something.com format.")
    String email;

    @NotNull(message = "Password is required.")
    @NotBlank(message = "Password is required.")
    String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "player_role",
            joinColumns = {
                @JoinColumn(name = "player_ID")},
            inverseJoinColumns = {
                @JoinColumn(name = "role_ID")})
    private List<Role> roles;

    LocalDate joinDate;

    boolean enabled;

    public Player() {
    }

    public Player(RegisterPlayerRequest rpr) {
        userName = rpr.getUserName();
        password = rpr.getPassword();
        email = rpr.getEmail();
    }

    public boolean isAdmin() {
        for (Role role : roles) {
            if (role.getRole().equals("ROLE_ADMIN")) {
                return true;
            }
        }
        return false;
    }
}
