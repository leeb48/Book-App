package com.project.bookapp.converters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.AttributeConverter;
import java.util.List;

public class CategoriesConverter implements AttributeConverter<List<String>, String> {

    private final ObjectMapper objectMapper;

    public CategoriesConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public String convertToDatabaseColumn(List<String> categories) {

        String json = null;

        try {
            json = objectMapper.writeValueAsString(categories);

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return json;
    }

    @Override
    public List<String> convertToEntityAttribute(String s) {
        List<String> categories = null;

        try {
            categories = objectMapper.readValue(s, List.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return categories;
    }
}
