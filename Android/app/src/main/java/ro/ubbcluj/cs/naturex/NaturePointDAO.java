package ro.ubbcluj.cs.naturex;
import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Delete;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;
import android.arch.persistence.room.Update;
import java.util.List;


/**
 * Created by mihaitopan on 11/29/2017.
 */

@Dao
public interface NaturePointDAO {
    @Query("SELECT * FROM naturepoints")
    List<NaturePoint> getNaturePoints();

    @Insert
    void addNaturePoint(NaturePoint naturePoint);

    @Delete
    void deleteNaturePoint(NaturePoint naturePoint);

    @Update
    void updateNaturePoint(NaturePoint naturePoint);
}
