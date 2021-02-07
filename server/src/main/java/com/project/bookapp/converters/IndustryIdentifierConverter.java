package com.project.bookapp.converters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.bookapp.domain.googlebooks.IndustryIdentifier;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.List;

@Converter
public class IndustryIdentifierConverter implements AttributeConverter<List<IndustryIdentifier>, String> {

    private final ObjectMapper objectMapper;

    public IndustryIdentifierConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }


    @Override
    public String convertToDatabaseColumn(List<IndustryIdentifier> industryIdentifier) {
        String json = null;

        try {
            json = objectMapper.writeValueAsString(industryIdentifier);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return json;
    }

    @Override
    public List<IndustryIdentifier> convertToEntityAttribute(String s) {
        List industryIdentifiers = null;
        try {
            System.out.println(s);
            industryIdentifiers = objectMapper.readValue(s, List.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return industryIdentifiers;
    }
}
