package com.project.bookapp.domain.googlebooks;
import java.util.List; 
public class VolumeInfo{
    public String title;
    public String subtitle;
    public List<String> authors;
    public String publisher;
    public String publishedDate;
    public String description;
    public List<IndustryIdentifier> industryIdentifiers;
    public ReadingModes readingModes;
    public int pageCount;
    public String printType;
    public List<String> categories;
    public double averageRating;
    public int ratingsCount;
    public String maturityRating;
    public boolean allowAnonLogging;
    public String contentVersion;
    public PanelizationSummary panelizationSummary;
    public ImageLinks imageLinks;
    public String language;
    public String previewLink;
    public String infoLink;
    public String canonicalVolumeLink;
}
