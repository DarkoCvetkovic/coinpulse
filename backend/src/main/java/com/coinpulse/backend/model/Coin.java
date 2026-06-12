package com.coinpulse.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "coins")
public class Coin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(max = 100)
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Symbol is required")
    @Pattern(regexp = "^[A-Z0-9]{2,10}$", message = "Symbol must be 2-10 uppercase letters or digits")
    @Column(nullable = false)
    private String symbol;

    @NotNull(message = "Price is required")
    @PositiveOrZero(message = "Price must be zero or positive")
    @Column(nullable = false, precision = 24, scale = 8)
    private BigDecimal price;

    @PositiveOrZero(message = "Market cap must be zero or positive")
    @Column(precision = 24, scale = 2)
    private BigDecimal marketCap;

    @Column(precision = 10, scale = 2)
    private BigDecimal change24h;

    // RANK is a reserved word in H2, so the column gets a different name
    @Positive(message = "Rank must be positive")
    @Column(name = "market_rank")
    private Integer rank;

    @NotBlank(message = "Category is required")
    @Size(max = 50)
    @Column(nullable = false)
    private String category;

    private LocalDate launchDate;

    @NotBlank(message = "Status is required")
    @Pattern(regexp = "active|delisted", message = "Status must be 'active' or 'delisted'")
    @Column(nullable = false)
    private String status;

    @Size(max = 1000)
    @Column(length = 1000)
    private String description;

    @Size(max = 500)
    @Column(length = 500)
    private String logoUrl;

    @com.fasterxml.jackson.annotation.JsonIgnore
    @jakarta.persistence.Lob
    @Column(name = "logo_data")
    private byte[] logoData;

    @com.fasterxml.jackson.annotation.JsonIgnore
    @Column(name = "logo_content_type")
    private String logoContentType;

    public Coin() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getMarketCap() {
        return marketCap;
    }

    public void setMarketCap(BigDecimal marketCap) {
        this.marketCap = marketCap;
    }

    public BigDecimal getChange24h() {
        return change24h;
    }

    public void setChange24h(BigDecimal change24h) {
        this.change24h = change24h;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getLaunchDate() {
        return launchDate;
    }

    public void setLaunchDate(LocalDate launchDate) {
        this.launchDate = launchDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public byte[] getLogoData() {
        return logoData;
    }

    public void setLogoData(byte[] logoData) {
        this.logoData = logoData;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }
}
