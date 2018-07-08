package ro.ubbcluj.cs.naturex;
import android.arch.persistence.room.Database;
import android.arch.persistence.room.RoomDatabase;


/**
 * Created by mihaitopan on 07/12/2017.
 */

@Database(entities = {NaturePoint.class}, version = 1)
public abstract class NaturePointDB extends RoomDatabase {
    public abstract NaturePointDAO naturePointDAO();
}
