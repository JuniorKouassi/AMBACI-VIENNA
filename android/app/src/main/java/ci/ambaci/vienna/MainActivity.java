package ci.ambaci.vienna;

import android.graphics.Color;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    this.bridge.getWebView().setBackgroundColor(Color.parseColor("#F77F00"));
  }
}
