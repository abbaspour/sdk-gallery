package net.abbaspour.auth0.gallery.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model, @AuthenticationPrincipal OidcUser principal) {
        if (principal != null) {
            model.addAttribute("profile", principal.getClaims());
            model.addAttribute("isAuthenticated", true);
        } else {
            model.addAttribute("isAuthenticated", false);
        }
        return "index";
    }

    @GetMapping("/profile")
    public String profile(Model model, @AuthenticationPrincipal OidcUser principal) {
        model.addAttribute("profile", principal.getClaims());
        model.addAttribute("isAuthenticated", true);
        return "profile";
    }
}