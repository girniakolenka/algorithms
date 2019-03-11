import java.util.List;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.*;
import java.nio.charset.Charset;
import java.util.Arrays;

public class Main {
    private static String userID1 = "951";
    private static String userID2 = "178";
    private static String[] user1Data;
    private static String[] user2Data;
    private static Integer inversions = 0;

    public static void main(String[] args) {
        try {
            Charset charset = Charset.forName("ISO-8859-1");
            String fileName = "/Users/olenkagirniak/Development/Prometheus/algorithms/Week_2/data.txt";
            List<String> allLines = Files.readAllLines(Paths.get(fileName), charset);

            for (String line : allLines) {
                String[] data = line.split(" ");
                String id = data[0];

                if (id.equals(userID1)) {
                    user1Data = data;
                    System.out.println(line);
                }
                if (id.equals(userID2)) {
                    user2Data = data;
                    System.out.println(line);
                }
            }

            countInversions(user1Data, user2Data);

            System.out.println(inversions);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    private static Integer countInversions(String[] user1Data, String[] user2Data) {
        Integer len = user1Data.length;
        String[] data1 = Arrays.copyOfRange(user1Data, 1, len);
        String[] data2 = Arrays.copyOfRange(user2Data, 1, len);
        String[] result = new String[len - 1];

        for (int i=0; i < result.length ; i++) {
            Integer index = Integer.parseInt(data1[i]) - 1;
            result[index] = data2[i];
        }

        mergeSort(result);

        return inversions;
    }

    private static String[] mergeSort(String[] arr) {
        Integer n = arr.length;
        Integer n2 = (int)Math.round((n / 2.0));

        if (n.equals(1)) {
            return  arr;
        }
        String[] leftArr = Arrays.copyOfRange(arr, 0, n2);
        String[] rightArr = Arrays.copyOfRange(arr, n2, n);

        return mergeSortedArrays(mergeSort(leftArr), mergeSort(rightArr));
    }

    private static String[] mergeSortedArrays(String[] leftArr, String[] rightArr) {
        Integer n = leftArr.length;
        Integer m = rightArr.length;
        Integer resultLength = n + m;
        String[] result = new String[resultLength];
        Integer i = 0;
        Integer j = 0;

        for (Integer k = 0; k< resultLength; k++) {
            Integer leftValue = i == n ? Integer.MAX_VALUE : Integer.parseInt(leftArr[i]);
            Integer rightValue = j == m ? Integer.MAX_VALUE : Integer.parseInt(rightArr[j]);

            if (rightValue == Integer.MAX_VALUE || leftValue <= rightValue) {
                result[k] = leftArr[i];
                i++;
            }

            if (leftValue == Integer.MAX_VALUE || leftValue > rightValue) {
                result[k] = rightArr[j];
                j++;
                inversions = inversions + n - i;
            }

        }

        return result;
    }
}
