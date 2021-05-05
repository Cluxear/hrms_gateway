package com.tw.gateway.web.rest.vm;

import com.tw.gateway.service.dto.UserDTO;

/**
 * View Model extending the UserDTO, which is meant to be used in the user management UI.
 */
public class ManagedUserVM extends UserDTO {

    private String phone;
    public ManagedUserVM() {
        // Empty constructor needed for Jackson.
    }

    // prettier-ignore

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "ManagedUserVM{" + super.toString() + "} ";
    }
}
