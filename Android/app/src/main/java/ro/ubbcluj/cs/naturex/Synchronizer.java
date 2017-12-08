package ro.ubbcluj.cs.naturex;
import java.util.List;


/**
 * Created by mihaitopan on 09/11/2017.
 */

public class Synchronizer {
    private NaturePointDB database;

    public List<NaturePoint> getList() {
        return database.naturePointDAO().getNaturePoints();
    }

    public Synchronizer(NaturePointDB database) {
        this.database = database;
    }

    public void add(NaturePoint np) {
        database.naturePointDAO().addNaturePoint(np);
    }

    public void delete(NaturePoint np) {
        database.naturePointDAO().deleteNaturePoint(np);
    }

    public void update(NaturePoint np) {
        database.naturePointDAO().updateNaturePoint(np);
    }
}
