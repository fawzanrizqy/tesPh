<!DOCTYPE html>
<html>
<head>
    <title>Bilangan Fibonacci</title>
</head>
<body>
    <h1>Bilangan Fibonacci</h1>

    <form method="POST" action="">
        <label for="rows">Rows:</label>
        <input type="number" id="rows" name="rows" required><br><br>

        <label for="columns">Columns:</label>
        <input type="number" id="columns" name="columns" required><br><br>

        <input type="submit">
    </form>

    <br>

    <?php
    function generateFibonacci($rows, $columns) {
        $fibonacci = [];
        $fibonacci[0] = 0;
        $fibonacci[1] = 1;

        for ($i = 2; $i < $rows * $columns; $i++) {
            $fibonacci[$i] = $fibonacci[$i - 1] + $fibonacci[$i - 2];
        }

        return $fibonacci;
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $rows = $_POST["rows"];
        $columns = $_POST["columns"];

        $fibonacci = generateFibonacci($rows, $columns);

        echo "<table border='1'>";
        $count = 0;
        for ($i = 0; $i < $rows; $i++) {
            echo "<tr>";
            for ($j = 0; $j < $columns; $j++) {
                echo "<td>" . $fibonacci[$count] . "</td>";
                $count++;
            }
            echo "</tr>";
        }
        echo "</table>";
    }
    ?>
</body>
</html>
