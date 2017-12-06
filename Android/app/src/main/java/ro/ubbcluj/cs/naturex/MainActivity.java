package ro.ubbcluj.cs.naturex;

import android.content.Intent;
import android.support.design.widget.TabLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    Boolean isSubjectChanged = false;
    static List<NaturePoint> naturePoints;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final TabLayout layout = findViewById(R.id.mainTabs);
        layout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                if(tab.getPosition() == 1) {
                    layout.getTabAt(0).select();
                    startActivity(new Intent(MainActivity.this, ViewListActivity.class));
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {}

            @Override
            public void onTabReselected(TabLayout.Tab tab) {}
        });

        MainActivity.naturePoints = new ArrayList<>();
        MainActivity.naturePoints.add(new NaturePoint("location1", "name1", "description1", 10.0));
        MainActivity.naturePoints.add(new NaturePoint("location2", "name2", "description2", 8.0));
        MainActivity.naturePoints.add(new NaturePoint("location3", "name3", "description3", 9.0));
    }

    public void onSendClick(View v) {
        TextView subjectView = findViewById(R.id.editText3);
        TextView messageView = findViewById(R.id.editText2);

        String subject = subjectView.getText().toString();
        String message = messageView.getText().toString();

        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.setType("message/rfc822");
        intent.putExtra(Intent.EXTRA_EMAIL, new String[]{"topanmihai@gmail.com"});
        intent.putExtra(Intent.EXTRA_SUBJECT, subject);
        intent.putExtra(Intent.EXTRA_TEXT, message);

        startActivity(Intent.createChooser(intent, "Send Email"));
    }
}
