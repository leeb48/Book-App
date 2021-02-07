package com.project.bookapp.converters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.List;

@Converter
public class AuthorsConverter implements AttributeConverter<List<String>, String> {

    private final ObjectMapper objectMapper;

    public AuthorsConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public String convertToDatabaseColumn(List<String> authors) {
        String json = null;
        try {
            json = objectMapper.writeValueAsString(authors);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return json;
    }

    @Override
    public List<String> convertToEntityAttribute(String s) {
        List<String> authors = null;
        try {
            authors = objectMapper.readValue(s, List.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return authors;
    }
}
