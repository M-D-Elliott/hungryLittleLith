package com.sg.hungrylillithrestservice.controller.request;

import com.sg.hungrylillithrestservice.service.Validations;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterPlayerRequest {

    @NotNull(message = "User name is required.")
    @NotBlank(message = "User name is required.")
    @Size(min = 8, max = 30, message = "User name must be between 8 and 30 characters")
    String userName;

    @NotNull(message = "Email address is required.")
    @NotBlank(message = "Email address is required.")
    @Size(min = 8, max = 20, message = "Email must be between 8 and 255 characters")
    @Pattern(regexp = Validations.EMAIL_REGEX, message="Email must be in valid something@something.com format.")
    String email;

    @NotNull(message = "Password is required.")
    @NotBlank(message = "Password is required.")
    @Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters")
    String password;

    @NotNull(message = "Confirm Password is required.")
    @NotBlank(message = "Confirm Password is required.")
    @Size(min = 8, max = 20, message = "Confirm Password must be between 8 and 20 characters")
    String confirmPassword;

}
