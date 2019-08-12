import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.*;
import java.nio.charset.Charset;

public class Main {
    public static void main(String[] args) {
        try {
            Charset charset = Charset.forName("ISO-8859-1");
            String fileName = "../data_examples/input.txt";
            List<String> allLines = Files.readAllLines(Paths.get(fileName), charset);

            System.out.println(countResult(allLines, -1000, 1000));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static Integer countResult(List<String> lines, Integer fromNum, Integer toNum) {
        Set<String> set = new HashSet<>(lines);
        Set<String> result = new HashSet<>();

        for(Integer i=fromNum; i<=toNum; i++) {
            System.out.println(i);
            for (String item : set){
                Long addition = i - Long.parseLong(item);;

                if (set.contains(Long.toString(addition))) {
                    result.add(i.toString());
                }
            }
        }

        return result.size();
    }
}