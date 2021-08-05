package com.mindbridge.core.images;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("image")
@Validated
public class ImageController {
	private final ImageService imageService;

	@Autowired
	public ImageController(ImageService imageService){
		this.imageService = imageService;
	}

	@PostMapping("/save")
	public ResponseEntity<?> createPost(@RequestParam("file") MultipartFile file){
		Optional<String> optional = imageService.uploadImages(file);
		if (optional.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(optional.get());
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
