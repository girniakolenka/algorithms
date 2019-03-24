import java.util.List;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.*;
import java.nio.charset.Charset;
import java.util.Arrays;

public class Main {
    private static Integer count = 0;

    public static void main(String[] args) {
        try {
            Charset charset = Charset.forName("ISO-8859-1");
            String fileName = "/Users/olenkagirniak/Development/Prometheus/algorithms/Week_3/data_examples_03/input__10000.txt";
            List<String> allLines = Files.readAllLines(Paths.get(fileName), charset);

            allLines.remove(0);
            quickSort(allLines, 0, allLines.size() - 1);

/*            for (String line : allLines) {
                System.out.println(line);
            }*/

            System.out.println(count);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void quickSort(List<String> arr, Integer start, Integer end) {
        if (start < end) {
            Integer partition = getPartition(arr, start, end);

            quickSort(arr, start, partition - 1);
            quickSort(arr, partition + 1, end);
        }
    }

    public static Integer getPartition(List<String> arr, Integer start, Integer end) {
        String x = arr.get(end);
        Integer i = start - 1;

        for (Integer j = start; j < end; j++) {
            if (Integer.valueOf(arr.get(j)).compareTo(Integer.valueOf(x)) <= 0) {
                i++;

                String y = arr.get(i);
                arr.set(i, arr.get(j));
                arr.set(j, y);
            }
        }

        count = count + end - start;

        Integer partition = i + 1;
        arr.set(end, arr.get(partition));
        arr.set(partition, x);

        return partition;
    }
}
