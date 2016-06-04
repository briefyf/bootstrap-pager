package org.brief.demo.utils;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by wangsy on 2015/11/18.
 */
public class UIUtil {

    public static boolean isAjaxRequest(HttpServletRequest request) {
        String header = request.getHeader("X-Requested-With");
        if (header != null && "XMLHttpRequest".equals(header)) {
            return true;
        } else {
            return false;
        }
    }


    public static void writeData2Client(final Map map, HttpServletResponse res) {
        final Map<String, String> dateFormatInfor = (Map<String, String>) map.get("dateFormatInfor");
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(java.util.Date.class,
                new JsonValueProcessor() {
                    @Override
                    public Object processObjectValue(String arg0, Object value, JsonConfig arg2) {
                        if (value == null) {
                            return "";
                        }
                        if (value instanceof java.util.Date) {
                            String formatResult = "";
                            if (dateFormatInfor != null && dateFormatInfor.containsKey(arg0)) {
                                formatResult = new SimpleDateFormat(dateFormatInfor.get(arg0)).format(value);
                            } else {
                                formatResult = new SimpleDateFormat("yyyy-MM-dd").format(value);
                            }
                            return formatResult;
                        }
                        return value;
                    }

                    @Override
                    public Object processArrayValue(Object arg0, JsonConfig arg1) {
                        return null;
                    }
                });
        jsonConfig.registerJsonValueProcessor(java.sql.Date.class,
                new JsonValueProcessor() {
                    @Override
                    public Object processObjectValue(String arg0, Object value, JsonConfig arg2) {
                        if (value == null) {
                            return "";
                        }
                        if (value instanceof java.sql.Date) {
                            String formatResult = "";
                            if (dateFormatInfor != null && dateFormatInfor.containsKey(arg0)) {
                                formatResult = new SimpleDateFormat(dateFormatInfor.get(arg0)).format(value);
                            } else {
                                formatResult = new SimpleDateFormat("yyyy-MM-dd").format(value);
                            }
                            return formatResult;
                        }
                        return value;
                    }

                    @Override
                    public Object processArrayValue(Object arg0, JsonConfig arg1) {
                        return null;
                    }
                });
        jsonConfig.registerJsonValueProcessor(java.sql.Timestamp.class,
                new JsonValueProcessor() {
                    @Override
                    public Object processObjectValue(String arg0, Object value, JsonConfig arg2) {
                        if (value == null) {
                            return "";
                        }
                        if (value instanceof java.sql.Timestamp) {
                            String result = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(value);
                            return result;
                        }
                        return value;
                    }

                    @Override
                    public Object processArrayValue(Object arg0, JsonConfig arg1) {
                        return null;
                    }
                });
        jsonConfig.registerJsonValueProcessor(java.sql.Time.class,
                new JsonValueProcessor() {
                    @Override
                    public Object processObjectValue(String arg0, Object value, JsonConfig arg2) {
                        if (value == null) {
                            return "";
                        }
                        if (value instanceof java.sql.Time) {
                            return new SimpleDateFormat("HH:mm:ss").format(value);
                        }
                        return value;
                    }

                    @Override
                    public Object processArrayValue(Object arg0, JsonConfig arg1) {
                        return null;
                    }
                });
        String json = JSONObject.fromObject(map, jsonConfig).toString();
        writeStr2OutPutStream(json, res);
    }

    public static void writeData2Client(final List list, HttpServletResponse res) {
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(java.util.Date.class,
                new JsonValueProcessor() {
                    @Override
                    public Object processObjectValue(String arg0, Object value, JsonConfig arg2) {
                        if (value == null) {
                            return "";
                        }
                        if (value instanceof java.util.Date) {
                            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd ");
                            return format.format(value);
                        }
                        return value;
                    }

                    @Override
                    public Object processArrayValue(Object arg0, JsonConfig arg1) {
                        return null;
                    }
                });
        jsonConfig.registerJsonValueProcessor(java.sql.Date.class,
                new JsonValueProcessor() {
                    @Override
                    public Object processObjectValue(String arg0, Object value, JsonConfig arg2) {
                        if (value == null) {
                            return "";
                        }
                        if (value instanceof java.sql.Date) {
                            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                            return format.format(value);
                        }
                        return value;
                    }

                    @Override
                    public Object processArrayValue(Object arg0, JsonConfig arg1) {
                        return null;
                    }
                });
        jsonConfig.registerJsonValueProcessor(java.sql.Timestamp.class,
                new JsonValueProcessor() {
                    @Override
                    public Object processObjectValue(String arg0, Object value, JsonConfig arg2) {
                        if (value == null) {
                            return "";
                        }
                        if (value instanceof java.sql.Timestamp) {
                            String result = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(value);
                            return result;
                        }
                        return value;
                    }

                    @Override
                    public Object processArrayValue(Object arg0, JsonConfig arg1) {
                        return null;
                    }
                });
        jsonConfig.registerJsonValueProcessor(java.sql.Time.class,
                new JsonValueProcessor() {
                    @Override
                    public Object processObjectValue(String arg0, Object value, JsonConfig arg2) {
                        if (value == null) {
                            return "";
                        }
                        if (value instanceof java.sql.Time) {
                            String result = new SimpleDateFormat("HH:mm:ss").format(value);
                            return result;
                        }
                        return value;
                    }

                    @Override
                    public Object processArrayValue(Object arg0, JsonConfig arg1) {
                        return null;
                    }
                });
        String json = JSONArray.fromObject(list, jsonConfig).toString();
        writeStr2OutPutStream(json, res);
    }

    public static void writeStr2OutPutStream(String resource, HttpServletResponse response) {
        response.setContentType("text/html");
        response.setContentType("text/html; charset=UTF-8");
        try {
            response.getWriter().write(resource);
        } catch (IOException ex) {
            throw new IllegalArgumentException(ex.getMessage());
        }
    }

    public static void writeImageBytes(String imagesPath, HttpServletResponse response) throws Exception {
        response.reset();
        response.setContentType("image/*");
        File imageFile = new File(imagesPath);
        InputStream is = new FileInputStream(imageFile);
        byte[] bytes = new byte[is.available()];
        is.read(bytes);
        response.getOutputStream().write(bytes);
        response.getOutputStream().flush();
        is.close();
    }

    /**
     * @param request
     * @return
     * @throws Exception
     */
    public static Map getReqParametersMap(HttpServletRequest request) throws UnsupportedEncodingException {
        Map paramMap = new HashMap<String, String>();
        Map<String, ?> reqMap = request.getParameterMap();
        Iterator<String> keys = reqMap.keySet().iterator();
        while (keys.hasNext()) {
            String key = keys.next();
            paramMap.put(key, request.getParameter(key));
        }
        return paramMap;
    }
}
