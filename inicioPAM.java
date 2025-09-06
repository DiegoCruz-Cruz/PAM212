import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class inicioPAM extends JFrame {

    JPanel pInfo, pBotones;
    JLabel lblInfo, lblOpciones;
    JTextArea txtInfo;
    JButton btnReglamento, btnLineamiento, btnFechas, btnPorcentaje;


    inicioPAM() {
        
        pBotones = new JPanel();
        pInfo = new JPanel(new BorderLayout());

        lblInfo = new JLabel("Información:");
        lblOpciones = new JLabel("Opciones:");

        txtInfo = new JTextArea(8, 30);

        JScrollPane scroll = new JScrollPane(txtInfo);

        btnReglamento = new JButton("Reglamento");
        btnLineamiento = new JButton("Lineamiento");
        btnFechas = new JButton("Fechas Importantes");
        btnPorcentaje = new JButton("Porcentaje de Aprobación");

        pBotones.add(lblOpciones);
        pBotones.add(btnReglamento);
        pBotones.add(btnLineamiento);
        pBotones.add(btnFechas);
        pBotones.add(btnPorcentaje);

        btnReglamento.addActionListener(actionListener);
        btnLineamiento.addActionListener(actionListener);
        btnFechas.addActionListener(actionListener);
        btnPorcentaje.addActionListener(actionListener);

        add(pBotones, BorderLayout.NORTH);
        add(scroll, BorderLayout.CENTER);
        add(pInfo, BorderLayout.SOUTH);

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        pack();
        setVisible(true);
    }

    ActionListener actionListener = new ActionListener()
    {
        @Override
        public void actionPerformed(ActionEvent e)
        {
            String comando = e.getActionCommand();
            if (comando.equals("Reglamento"))
            {
                txtInfo.setText(ReglamentoPOO());
            } else if (comando.equals("Lineamiento"))
            {
                txtInfo.setText(LineamientosClassroom());
            } else if (comando.equals("Fechas Importantes"))
            {
                txtInfo.setText(FechasdeParciales());
            } else if (comando.equals("Porcentaje de Aprobación"))
            {
                txtInfo.setText(PorcentajesporParcial());
            }
        }
    };

    public String ReglamentoPOO()
    {
        return "1. Participación activa en clase\n2. No usar chat en prácticas o examen";
    }

    public String LineamientosClassroom()
    {
        return "1. Trabajos en classroom\n2. Entregas completas\n3. Respetar tiempos de entrega\n4. Presentación de trabajo calidad universitaria\n5. Todos los trabajos llevan portada estilo libre: Logo UPQ, tema, datos de alumno, materia\n6. Conclusiones de aprendizaje: Descripción de lo aprendido durante el desarrollo de la actividad";
    }

    public String FechasdeParciales()
    {
        return "Parcial 1: 30 de septiembre\nParcial 2: 2 de noviembre\nParcial 3: 2 de diciembre";
    }

    public String PorcentajesporParcial()
    {
        return "Parcial 1\n"
            + "EVIDENCIA DE CONOCIMIENTO  40%\n"
            + "EVIDENCIA DE DESEMPEÑO     20%\n"
            + "EVIDENCIA DE PRODUCTO      30%\n"
            + "PROYECTO INTEGRADOR        10%\n\n"
            + "Parcial 2\n"
            + "EVIDENCIA DE CONOCIMIENTO  40%\n"
            + "EVIDENCIA DE DESEMPEÑO     20%\n"
            + "EVIDENCIA DE PRODUCTO      20%\n"
            + "PROYECTO INTEGRADOR        20%\n\n"
            + "Parcial 3\n"
            + "EVIDENCIA DE CONOCIMIENTO  20%\n"
            + "EVIDENCIA DE DESEMPEÑO     10%\n"
            + "EVIDENCIA DE PRODUCTO      40%\n"
            + "PROYECTO INTEGRADOR        30%";
    }

    public static void main(String[] args)
    {
        new inicioPAM();
    }
}
