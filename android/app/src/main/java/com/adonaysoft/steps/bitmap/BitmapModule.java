package com.adonaysoft.steps.bitmap;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.util.Log;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;

import static android.util.Log.println;

public class BitmapModule extends ReactContextBaseJavaModule {
        public static Bitmap convertToMutable(Bitmap imgIn) {
            try {

                //this is the file going to use temporally to save the bytes.
                // This file will not be a image, it will store the raw image data.
                File file = new File(Environment.getExternalStorageDirectory() + File.separator + "temp.tmp");

                //Open an RandomAccessFile
                //Make sure you have added uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
                //into AndroidManifest.xml file
                RandomAccessFile randomAccessFile = new RandomAccessFile(file, "rw");

                // get the width and height of the source bitmap.
                int width = imgIn.getWidth();
                int height = imgIn.getHeight();

                Bitmap.Config type = imgIn.getConfig();

                //Copy the byte to the file
                //Assume source bitmap loaded using options.inPreferredConfig = Config.ARGB_8888;
                FileChannel channel = randomAccessFile.getChannel();

                MappedByteBuffer map = channel.map(FileChannel.MapMode.READ_WRITE, 0, imgIn.getRowBytes()*height);

                //ByteBuffer buffer = ByteBuffer.wrap(os.toByteArray());
                imgIn.copyPixelsToBuffer(map);

                //recycle the source bitmap, this will be no longer used.
                imgIn.recycle();
                System.gc();// try to force the bytes from the imgIn to be released

                //Create a new bitmap to load the bitmap again. Probably the memory will be available.
                imgIn = Bitmap.createBitmap(width, height, type);

                map.position(0);

                //load it back from temporary
                imgIn.copyPixelsFromBuffer(map);

                //close the temporary file and channel , then delete that also
                channel.close();
                randomAccessFile.close();

                // delete the temp file
                file.delete();

                //println(Log.INFO, "BitmapModule","file "+file);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            return imgIn;
        }

        public BitmapModule(ReactApplicationContext reactContext) {
            super(reactContext);
        }

        @Override
        public String getName() {
            return "Bitmap";
        }

        @ReactMethod
        public void getPixels(String filePath, final Promise promise) {
            try {
                WritableNativeMap result = new WritableNativeMap();
                WritableNativeArray pixels = new WritableNativeArray();

                Bitmap bitmap = BitmapFactory.decodeFile(filePath);
                bitmap = convertToMutable(bitmap);

                //Bitmap response = Bitmap.
                if (bitmap == null) {
                    promise.reject("Failed to decode. Path is incorrect or image is corrupted");
                    return;
                }

                int width = bitmap.getWidth();
                int height = bitmap.getHeight();

                boolean hasAlpha = bitmap.hasAlpha();
               // Bitmap newB = Bitmap.createBitmap(width*70,height*70,bitmap.getConfig());
                //int[] colors = bitmap.;
                //bitmap.setHeight(height+32);
                //bitmap.setWidth(width+32);
              /*  println(Log.INFO, "BitmapModule","file "+bitmap.getWidth());
                int xM = 0;
                int yM = 0;
                int yAux=0;*/
                for (int x = 0; x < width; x++) {
                   // int auxX = xM;

                    for (int y = 0; y < height; y++) {
                        int color = bitmap.getPixel(x, y);
                       /* int c = 0;
                        int c2 = 0;
                        int oriY = yM;
                        xM=auxX;*/
                        String hex = Integer.toHexString(color);
                        pixels.pushString(hex);
                        /*
                        while (c<70) {
                            while (c2 < 70) {
                              //  newB.setPixel(xM, yM, color);
                                yM++;
                                c2++;
                            }
                            yAux++;
                            c++;
                            xM++;
                            c2=0;
                            yM=oriY;


                        }
                        yM=yAux;*/

                    }
                    /*yAux=0;
                    yM = 0;
                    //xM+=xM*1;*/

                }
/*
                Bitmap newB = Bitmap.createScaledBitmap(bitmap, width*5, height*5, true);

                File pictureFile = new File(filePath);
                FileOutputStream fos = new FileOutputStream(pictureFile);
                newB.compress(Bitmap.CompressFormat.JPEG, 100, fos);*/

                result.putInt("width", width);
                result.putInt("height", height);
                result.putBoolean("hasAlpha", hasAlpha);
                result.putArray("pixels", pixels);
                result.putString("path","file://"+filePath);

                promise.resolve(result);

            } catch (Exception e) {
                promise.reject(e);
            }

        }

    }

