package ro.ubbcluj.cs.naturex;

/**
 * Created by mihaitopan on 09/11/2017.
 */

public class NaturePoint {
    private String location;
    private String name;
    private String description;
    private Double rating;
    private Integer noPeopleWhoRated;

    public NaturePoint() {
        this.location = "";
        this.name = "NulPlace";
        this.description = "basic empty place";
        this.rating = 0.0;
        this.noPeopleWhoRated = 0;
    }

    public NaturePoint(String location, String name, String description, Double rating) {
        this.location = location;
        this.name = name;
        this.description = description;
        this.rating = rating;
        this.noPeopleWhoRated = 0;
    }

    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public Double getRating() {
        return rating;
    }
    public void setRating(Double rating) {
        this.rating = (this.rating * this.noPeopleWhoRated + rating) / ++this.noPeopleWhoRated;
    }

    @Override
    public String toString() {
        return this.location;
    }
}
