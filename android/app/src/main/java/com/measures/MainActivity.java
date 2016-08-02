package com.measures;

import com.facebook.react.ReactActivity;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnativenavigation.activities.RootActivity;

public class MainActivity extends RootActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Measures";
    }
}
