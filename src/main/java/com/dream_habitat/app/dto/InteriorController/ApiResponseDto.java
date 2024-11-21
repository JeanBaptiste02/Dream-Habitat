package com.dream_habitat.app.dto.InteriorController;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
public class ApiResponseDto {

    private List<FileDetailDto> files;
    private List<Object> failed;
    private List<Object> queued;
    private List<Object> processing;
    private boolean finished;
    private int queueCount;
    private int conversion;
    private List<Object> errors;
    private String status;

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FileDetailDto {
        private String url;
        private String filename;
        private String terms;
        private String negativeTerms;
        private boolean fixFaces;
        private String dimension;
        private String original;
    }
}

