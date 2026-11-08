# -*- coding: utf-8 -*-
from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE

prs = Presentation(r"C:\Users\USUARIO\Downloads\Guía Marca Personal.pptx")


def set_shape_text_keep_format(shape, new_text):
    tf = shape.text_frame
    first_p = tf.paragraphs[0]
    if first_p.runs:
        first_p.runs[0].text = new_text
        for r in first_p.runs[1:]:
            r.text = ""
    else:
        first_p.add_run().text = new_text
    for p in tf.paragraphs[1:]:
        for r in p.runs:
            r.text = ""


def set_two_paragraphs(shape, line1, line2):
    tf = shape.text_frame
    if tf.paragraphs[0].runs:
        tf.paragraphs[0].runs[0].text = line1
        for r in tf.paragraphs[0].runs[1:]:
            r.text = ""
    else:
        tf.paragraphs[0].add_run().text = line1
    if len(tf.paragraphs) > 1:
        if tf.paragraphs[1].runs:
            tf.paragraphs[1].runs[0].text = line2
            for r in tf.paragraphs[1].runs[1:]:
                r.text = ""
        else:
            tf.paragraphs[1].add_run().text = line2


def set_cell_text(cell, new_text):
    tf = cell.text_frame
    p = tf.paragraphs[0]
    if p.runs:
        p.runs[0].text = new_text
        for r in p.runs[1:]:
            r.text = ""
    else:
        p.add_run().text = new_text
    for p in tf.paragraphs[1:]:
        for r in p.runs:
            r.text = ""


def find_shape(slide, name):
    for shape in slide.shapes:
        if shape.name == name:
            return shape
    return None


def find_nested(shapes, name):
    for shape in shapes:
        if shape.name == name:
            return shape
        if shape.shape_type == MSO_SHAPE_TYPE.GROUP:
            found = find_nested(shape.shapes, name)
            if found:
                return found
    return None


# SLIDE 5
s5 = prs.slides[4]
set_shape_text_keep_format(
    find_nested(s5.shapes, "TextBox 14"),
    "Posicionarme como futuro Ingeniero de Sistemas especializado en el desarrollo "
    "y optimización de soluciones con IA, para ganar visibilidad y empleabilidad "
    "en el sector tecnológico.",
)
table21 = find_shape(s5, "Table 21")
for r, c, text in [
    (0, 1, "Crear un portafolio digital con 3 proyectos y obtener una certificación técnica en IA."),
    (1, 1, "1 proyecto al mes + completar el 100% de los módulos de la certificación."),
    (2, 1, "Dedicar 6 horas semanales de estudio y práctica de forma constante."),
    (3, 1, "Fortalecer mi perfil para reclutadores y posibles clientes."),
    (4, 1, "Lograrlo en un plazo de 6 meses."),
]:
    set_cell_text(table21.table.cell(r, c), text)

# SLIDE 6
s6 = prs.slides[5]
set_shape_text_keep_format(find_shape(s6, "TextBox 10"), "Carlos Mendoza")
set_shape_text_keep_format(
    find_shape(s6, "TextBox 11"),
    "38 años  ·  Director de Operaciones e IT  ·  Resultados, agilidad y buen uso del presupuesto",
)
set_shape_text_keep_format(
    find_shape(s6, "TextBox 13"),
    "Sus sistemas van lentos, la información se atasca y le faltan herramientas claras "
    "para tomar decisiones con tranquilidad. Quiere orden, control y resultados sin "
    "complicarse de más.",
)
set_shape_text_keep_format(
    find_shape(s6, "TextBox 15"),
    "Le ayudo con soluciones simples, bien pensadas y fáciles de usar: automatizo tareas "
    "repetitivas, aclaro lo que hoy se ve confuso y le doy más seguridad al momento de decidir.",
)

# SLIDE 7
s7 = prs.slides[6]
set_shape_text_keep_format(
    find_nested(s7.shapes, "TextBox 14"),
    "Helverth diseña y pone en marcha soluciones de ingeniería claras y eficientes para "
    "equipos tecnológicos en transformación digital, con un enfoque analítico y ético "
    "que cuida los recursos y mantiene todo funcionando.",
)
set_shape_text_keep_format(
    find_nested(s7.shapes, "TextBox 23"),
    "1. Formación en sistemas   2. Aprendizaje constante por cuenta propia   3. Compromiso ético en cada proyecto",
)
set_shape_text_keep_format(
    find_nested(s7.shapes, "TextBox 32"),
    "Uno rigor lógico con soluciones simples, cercanas y orientadas a resultados reales.",
)

# SLIDE 8
s8 = prs.slides[7]
set_shape_text_keep_format(
    find_nested(s8.shapes, "TextBox 12"),
    "A Carlos le cuesta ver dónde se traban los procesos y qué está fallando en el "
    "rendimiento de sus sistemas.",
)
set_shape_text_keep_format(
    find_nested(s8.shapes, "TextBox 18"),
    "Tableros en tiempo real, reportes semanales claros, guías interactivas y "
    "asistentes virtuales que expliquen lo complejo en lenguaje sencillo.",
)
set_shape_text_keep_format(
    find_nested(s8.shapes, "TextBox 24"),
    "Un servicio de monitoreo y auditoría visual con tableros ejecutivos simples, "
    "para que pueda entender lo que pasa y decidir con más confianza.",
)

# SLIDE 9
s9 = prs.slides[8]
set_two_paragraphs(find_nested(s9.shapes, "TextBox 8"), "HELVERTH", "SÁNCHEZ")
set_shape_text_keep_format(
    find_nested(s9.shapes, "TextBox 12"),
    "PROPÓSITO: Ser referente en soluciones escalables y seguras",
)
set_shape_text_keep_format(
    find_nested(s9.shapes, "TextBox 16"),
    "ESENCIA: Pasión por la tecnología y el análisis lógico",
)
set_shape_text_keep_format(
    find_nested(s9.shapes, "TextBox 20"),
    "PÚBLICO: Directores de IT y empresas en transformación",
)
set_shape_text_keep_format(
    find_nested(s9.shapes, "TextBox 24"),
    "BANG: Diagnóstico y tableros ejecutivos claros",
)
set_shape_text_keep_format(
    find_shape(s9, "TextBox 25"),
    "IDEAS + TECNOLOGÍA = SOLUCIONES",
)

# SLIDE 10
s10 = prs.slides[9]
pitch = (
    "¿Buscas convertir la complejidad técnica de tu empresa en soluciones ágiles, "
    "seguras y fáciles de entender? Soy Helverth Sánchez, estudiante de Ingeniería "
    "de Sistemas, apasionado por el desarrollo de software y por hacer que los "
    "procesos fluyan mejor. Combino análisis lógico con ideas prácticas para que "
    "la tecnología deje de ser un dolor de cabeza y se convierta en tu mejor aliada. "
    "¡Hagamos que la tecnología trabaje para ti!"
)
set_shape_text_keep_format(find_shape(s10, "TextBox 9"), pitch)

# SLIDE 11 left blank intentionally

# SLIDE 12
s12 = prs.slides[11]
reflexion = (
    "Usé la IA como un copiloto estratégico para ordenar ideas, integrar conceptos "
    "y darle forma a metodologías como SMART y BANG. Me ayudó a estructurar el "
    "contenido y a visualizar mejor mi marca, pero las decisiones sobre mis valores, "
    "mi visión profesional y lo que realmente quiero proyectar fueron 100% mías. "
    "La IA potencia, pero la esencia la pongo yo."
)
set_shape_text_keep_format(find_shape(s12, "TextBox 10"), reflexion)
set_shape_text_keep_format(
    find_shape(s12, "TextBox 12"),
    "La IA potencia, pero la esencia la pongo yo.",
)

out = r"C:\Users\USUARIO\Desktop\pagina-carros\Guia_Marca_Personal_Completa.pptx"
prs.save(out)
print("Saved:", out)
