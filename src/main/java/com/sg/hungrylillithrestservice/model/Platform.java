package com.sg.hungrylillithrestservice.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class Platform {
    @Id
    private int ID;
    
    @NotNull
    @NotBlank
    @Size(min = 2, max = 30, message = "Platform name must be between 8 and 30 characters")
    String name;
    
    @NotNull
    @NotBlank
    boolean existsOn;
}
