package com.mindbridge.core.images;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {

	private static final Logger logger = LoggerFactory.getLogger(ImageService.class);

	private final FileSystem fileSystem;

	@Autowired
	public ImageService(FileSystem fileSystem) {
		this.fileSystem = fileSystem;
	}

	public Optional<String> uploadImages(MultipartFile multipartFile) {
		byte[] byteFile;
		try {
			byteFile = multipartFile.getBytes();
		}
		catch (IOException e) {
			logger.error("Cannot parse incoming file");
			return Optional.empty();
		}
		UUID uuid = UUID.randomUUID();
		return fileSystem.saveFile(byteFile, uuid);
	}

}
