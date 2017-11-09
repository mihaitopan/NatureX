package ro.ubbcluj.cs.naturex;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;


/**
 * Created by mihaitopan on 09/11/2017.
 */

public class DetailsActivity extends AppCompatActivity {

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        this.finish();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_details);

        TabLayout layout = findViewById(R.id.detailsTabs);

        layout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                finish();
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {
                finish();
            }
        });

        LinearLayout layout1 = findViewById(R.id.detailsLayout);

        Intent intent = getIntent();
        final String currentLocation = intent.getStringExtra("location");
        TextView textView = new TextView(this);
        textView.setText(currentLocation);
        textView.setTextSize((float)20);

        layout1.addView(textView);

        NaturePoint place = getNaturePoint(currentLocation);
        final EditText editTextName = new EditText(this);
        editTextName.setText(place.getName());
        final EditText editTextDescription = new EditText(this);
        editTextDescription.setText(place.getDescription());
        final EditText editTextRating = new EditText(this);
        editTextRating.setText(String.valueOf(place.getRating()));

        Button editButton = new Button(this);
        editButton.setText("Edit");
        editButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    String name = editTextName.getText().toString();
                    String description = editTextDescription.getText().toString();
                    Double rating = Double.parseDouble(editTextRating.getText().toString());

                    setNaturePoint(currentLocation, name, description, rating);
                    Toast.makeText(DetailsActivity.this, "Edited succesfully!", Toast.LENGTH_LONG).show();

                } catch(RuntimeException e) {
                    Toast.makeText(DetailsActivity.this, "Error at input numbers!", Toast.LENGTH_LONG).show();
                }
            }
        });

        layout1.addView(editTextName);
        layout1.addView(editTextDescription);
        layout1.addView(editTextRating);
        layout1.addView(editButton);
    }

    NaturePoint getNaturePoint(String location) {
        for(int i = 0; i < MainActivity.naturePoints.size(); i++) {
            if(location.compareTo(MainActivity.naturePoints.get(i).getLocation()) == 0) {
                return MainActivity.naturePoints.get(i);
            }
        }
        return null;
    }
    void setNaturePoint(String currentLocation, String name, String description, Double rating) {
        for(int i = 0; i < MainActivity.naturePoints.size(); i++) {
            if(currentLocation.compareTo(MainActivity.naturePoints.get(i).getLocation()) == 0) {
                MainActivity.naturePoints.get(i).setName(name);
                MainActivity.naturePoints.get(i).setDescription(description);
                MainActivity.naturePoints.get(i).setRating(rating);
            }
        }
    }
}
