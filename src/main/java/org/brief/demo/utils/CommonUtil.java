package org.brief.demo.utils;

import org.apache.log4j.Logger;

import java.util.Iterator;
import java.util.List;

/**
 * Created by wangsy on 15/11/21.
 */
public class CommonUtil {
    private static Logger logger = Logger.getLogger(CommonUtil.class);

    public static void printList(List list) {
        Iterator iterator = list.iterator();
        while (iterator.hasNext()) {
            Object next = iterator.next();
            logger.info(next);
        }
    }
}
