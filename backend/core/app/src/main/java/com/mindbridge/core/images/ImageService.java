package com.mindbridge.core.images;

import com.azure.core.util.BinaryData;
import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobClientBuilder;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {

	private static final Logger logger = LoggerFactory.getLogger(ImageService.class);

	@Value("${azure.blob.url}")
	String blobUrl;

	@Value("${azure.blob.key}")
	String blobKey;

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

		BlobClient blobClient = new BlobClientBuilder()
			.endpoint(blobUrl + "/"
				+ uuid + "?" + blobKey)
			.buildClient();
		blobClient.upload(BinaryData.fromBytes(byteFile));
		return Optional.of(blobClient.getBlobUrl());
	}
}
