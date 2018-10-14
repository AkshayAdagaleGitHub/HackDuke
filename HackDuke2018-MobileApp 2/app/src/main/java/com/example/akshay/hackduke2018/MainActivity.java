package com.example.akshay.hackduke2018;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.os.Debug;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "test";
    Button login,register;
    EditText name,zip,job,number,skill,region;
    TextView title;
    int length=0,lenghtRegion=0,lengthJob=0;
    Boolean checked = false;
    private String remoteIP="http://" +
            "13.58.41.200:1337";
    Toolbar mTopToolbar;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

       /* mTopToolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(mTopToolbar);*/

        name = findViewById(R.id.editTextName);
        number=findViewById(R.id.editTextNumber);
        skill= findViewById(R.id.editTextSkill);
        zip = findViewById(R.id.editTextZip);
        region =findViewById(R.id.editTextRegion1);
        job = findViewById(R.id.editTextJob);
        title = findViewById(R.id.title);
        register = findViewById(R.id.buttonCreate);



        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
        String name1,zip1,number1,skill1,region1,job1;
        name1 = name.getText().toString();
        zip1 = zip.getText().toString();
        number1= "+1"+ number.getText().toString();
        skill1= skill.getText().toString();
        region1= region.getText().toString();
        job1= job.getText().toString();

                final OkHttpClient client = new OkHttpClient();
                RequestBody formBody = new FormBody.Builder()
                        .add("Name", name1)
                        .add("from", number1)
                        .add("zip", zip1)
                        .add("region", region1)
                        .add("job", job1)
                        .add("skill", skill1)
                        .build();

                Request request = new Request.Builder()
                        .url(remoteIP + "/register_workrequest_mobile")
                        .post(formBody)
                        .build();

                client.newCall(request).enqueue(new Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {
                        Log.d(TAG, "onFailure: ");
                    }

                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                       // Toast.makeText(MainActivity.this, "We have sent the work request across all the registered handymans", Toast.LENGTH_SHORT).show();
                        Log.d(TAG, "onResponse: done");
                    }
                });
            }
        });


    }

}
