package com.mindbridge.core.images;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class FileSystem {

	private static final Logger logger = LoggerFactory.getLogger(FileSystem.class);

	public final File IMAGE_FOLDER = new File(File.separator + "images");

	public Optional<String> saveFile(byte[] file, UUID id) {
		if (!IMAGE_FOLDER.exists()) {
			if (IMAGE_FOLDER.mkdir()) {
			}
		}
		BufferedOutputStream bos;
		FileOutputStream fos;
		try {
			fos = new FileOutputStream(new File(getPathById(id)));
			bos = new BufferedOutputStream(fos);
			bos.write(file);

		}
		catch (IOException e) {
			logger.error("Cannot save file");
			return Optional.empty();
		}
		return Optional.of(id.toString());
	}

	public String getHTTPUrlById(UUID id) {
		return "http://127.0.0.1:5000" + getPathById(id);
	}

	private String getPathById(UUID id) {
		return IMAGE_FOLDER + File.separator + id + ".jpg";
	}

	public byte[] getImageById(UUID id) {
		byte[] content = null;
		try {
			content = Files.readAllBytes(Path.of(getPathById(id)));
		}
		catch (final IOException e) {
			logger.error("Cannot get file");
		}
		return content;
	}

}
