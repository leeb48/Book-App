package com.project.bookapp.converters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.bookapp.domain.googlebooks.ImageLinks;

import javax.persistence.AttributeConverter;

public class ImageLinksConverter implements AttributeConverter<ImageLinks, String> {

    private final ObjectMapper objectMapper;

    public ImageLinksConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public String convertToDatabaseColumn(ImageLinks imageLinks) {
        String json = null;
        try {
            json = objectMapper.writeValueAsString(imageLinks);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return json;
    }

    @Override
    public ImageLinks convertToEntityAttribute(String s) {

        ImageLinks imageLinks = null;

        try {
            imageLinks = objectMapper.readValue(s, ImageLinks.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return imageLinks;
    }
}
