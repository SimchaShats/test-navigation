package com.measures;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnativenavigation.activities.RootActivity;
import com.reactnativenavigation.packages.RnnPackage;

import java.util.Arrays;
import java.util.List;


public class MainActivity extends RootActivity {

    @Override
    public String getJSBundleFile() {
        return CodePush.getBundleUrl();
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    public String getMainComponentName() {
        return "measures";
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    public List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new RnnPackage(),
                new ReactNativeI18n(),
                new RNSpinkitPackage(),
                new VectorIconsPackage(),
                new CodePush("uwHC01dOXJPBPvzpnR9w3SI_5m3_VyyiZVSGb", this, BuildConfig.DEBUG)
        );
    }

}
