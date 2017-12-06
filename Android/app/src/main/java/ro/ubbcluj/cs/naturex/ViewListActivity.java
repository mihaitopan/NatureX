package ro.ubbcluj.cs.naturex;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;

import java.util.List;

/**
 * Created by mihaitopan on 09/11/2017.
 */

public class ViewListActivity extends AppCompatActivity {
    @Override
    public void onBackPressed() {
        super.onBackPressed();
        this.finish();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_list);

        TabLayout layout = findViewById(R.id.viewListTabs);
        layout.getTabAt(1).select();

        populateBikeList();

        layout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                if(tab.getPosition() == 0) {
                    finish();
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {}

            @Override
            public void onTabReselected(TabLayout.Tab tab) {}
        });
    }
    
    void populateBikeList() {
        List<NaturePoint> currentList = getPlaces();

        // listview, recycleview
        int i;
        LinearLayout listLayout = findViewById(R.id.listLayout);

        for(i = 0; i < currentList.size(); i++)
        {
            Button b = new Button(this);
            b.setText(currentList.get(i).toString());
            b.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    onClickGoToDetails(v);
                }
            });

            listLayout.addView(b);
        }
    }

    List<NaturePoint> getPlaces() {
        return MainActivity.naturePoints;
    }

    void onClickGoToDetails(View v) {
        Intent intent = new Intent(this, DetailsActivity.class);
        intent.putExtra("location", ((Button) v).getText());
        startActivity(intent);
    }
}
