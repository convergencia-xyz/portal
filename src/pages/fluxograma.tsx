import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { useDisclosure } from "@mantine/hooks";

import "@mantine/core/styles.css";
import {
  MantineProvider,
  Stack,
  SimpleGrid,
  Card,
  rem,
  Text,
  Badge,
  Group,
  Modal,
  Title,
  Divider,
  List,
} from "@mantine/core";
import { IconX, IconCircleCheck } from "@tabler/icons-react";

interface IConteudo {
  nome: string;
  descricao?: string;
  url?: string;
}

interface IEmenta {
  conteudos: IConteudo[];
}

interface IReferenciaBibliografica {
  nome: string;
  url?: string;
  descricao?: string;
  tipo?: string;
}

interface IBibliografia {
  obrigatoria: IReferenciaBibliografica[];
  complementar: IReferenciaBibliografica[];
}

interface IDependencia {
  nome: string;
  url?: string;
}

interface IDisciplina {
  nome: string;
  horas: number;
  creditos: number;
  concluida?: boolean;
  ementa?: IEmenta;
  bibliografia?: IBibliografia;
  categorias?: string[];
  periodo?: number;
  departamento?: string;
  url?: string;
  dependencias?: IDependencia[];
  codigos?: string[];
}

interface IPeriodo {
  disciplinas: IDisciplina[];
  nome: string;
}

interface IFluxograma {
  periodos: IPeriodo[];
  titulo: string;
}

const Disciplina = (disciplina: IDisciplina) => {
  const [opened, { open, close }] = useDisclosure(false);

  const icon = disciplina.concluida ? (
    <IconCircleCheck
      color="green"
      style={{
        width: "15%",
        height: "15%",
        position: "absolute",
        top: 10,
        right: 10,
      }}
    />
  ) : undefined;

  //mock
  const ementa = {
    conteudos: [
      {
        nome: "Introdução à Engenharia de Software",
        url: "https://www.example.com/intro-engenharia-software",
      },
      { nome: "Processos de Software" },
      { nome: "Modelos de Processos de Software" },
      {
        nome: "Engenharia de Requisitos",
        url: "https://www.example.com/engenharia-requisitos",
      },
    ],
  };
  //mock
  const periodo = 3;
  //mock
  const departamento = "Matemática";
  //mock
  const bibliografia = {
    obrigatoria: [
      {
        nome: "Pressman, R. S. Engenharia de Software. 6ª ed. McGraw-Hill, 2006.",
        url: "https://www.example.com/pressman",
      },
      {
        nome: "Sommerville, I. Engenharia de Software. 9ª ed. Pearson, 2011.",
        url: "https://www.example.com/sommerville",
      },
    ],
    complementar: [
      { nome: "Bezerra, E. Engenharia de Software. 2ª ed. Pearson, 2011." },
      {
        nome: "Briand, L. C. Engenharia de Software. LTC, 2005.",
        url: "https://www.example.com/briand",
      },
    ],
  };
  //mock
  const dependencias = [
    { nome: "Programação 1", url: "https://www.example.com/programacao-1" },
    {
      nome: "Estrutura de Dados",
      url: "https://www.example.com/estrutura-dados",
    },
  ];
  //mock
  const url = "https://www.ufpb.br";
  //mock
  const codigos = ["IMD0030", "IMD0031"];
  //mock
  disciplina = {
    ...disciplina,
    ementa,
    periodo,
    departamento,
    bibliografia,
    dependencias,
    url,
    codigos,
  };

  return (
    <>
      <Modal
        opened={opened}
        title={<Title order={3}>{disciplina.nome}</Title>}
        onClose={close}
        centered
        size="auto"
      >
        <Divider />
        <br />
        <Stack gap="xs">
          <Badge color={disciplina.concluida ? "green" : "indigo"}>
            {disciplina.concluida ? "Concluído" : "Pendente"}
          </Badge>
          {disciplina.url ? (
            <Text>
              <b>Página da disciplina:</b>{" "}
              <a href={disciplina.url}>{disciplina.url}</a>
            </Text>
          ) : null}
          <Text>
            <b>Carga:</b> {disciplina.creditos} créditos ({disciplina.horas}{" "}
            horas)
          </Text>
          {disciplina.periodo ? (
            <Text>
              <b>Período:</b> {disciplina.periodo}º
            </Text>
          ) : null}
          {disciplina.departamento ? (
            <Text>
              <b>Departamento:</b> {disciplina.departamento}
            </Text>
          ) : null}
          {disciplina.codigos ? (
            <Text>
              <b>Códigos:</b>{" "}
              <List withPadding listStyleType="disc">
                {disciplina.codigos.map((item, index) => (
                  <List.Item key={index}>{item}</List.Item>
                ))}
              </List>
            </Text>
          ) : null}
          {disciplina.ementa ? (
            <Text>
              <b>Ementa:</b>{" "}
              <List withPadding listStyleType="disc">
                {disciplina.ementa.conteudos.map((item, index) => (
                  <List.Item key={index}>
                    {item.url ? <a href={item.url}>{item.nome}</a> : item.nome}
                  </List.Item>
                ))}
              </List>
            </Text>
          ) : null}

          {disciplina.categorias ? (
            <Text>
              <b>Categorias:</b>{" "}
              <List withPadding listStyleType="disc">
                {disciplina.categorias.map((item, index) => (
                  <List.Item key={index}>{item}</List.Item>
                ))}
              </List>
            </Text>
          ) : null}
          {disciplina.dependencias ? (
            <Text>
              <b>Dependências curriculares:</b>{" "}
              <List withPadding listStyleType="disc">
                {disciplina.dependencias.map((item, index) => (
                  <List.Item key={index}>
                    {item.url ? <a href={item.url}>{item.nome}</a> : item.nome}
                  </List.Item>
                ))}
              </List>
            </Text>
          ) : null}
          {disciplina.bibliografia?.obrigatoria ? (
            <Text>
              <b>Bibliografia Obrigatória:</b>{" "}
              <List withPadding listStyleType="disc">
                {disciplina.bibliografia.obrigatoria.map((item, index) => (
                  <List.Item key={index}>
                    {item.url ? <a href={item.url}>{item.nome}</a> : item.nome}
                  </List.Item>
                ))}
              </List>
            </Text>
          ) : null}
          {disciplina.bibliografia?.complementar ? (
            <Text>
              <b>Bibliografia Complementar:</b>{" "}
              <List withPadding listStyleType="disc">
                {disciplina.bibliografia.complementar.map((item, index) => (
                  <List.Item key={index}>
                    {item.url ? <a href={item.url}>{item.nome}</a> : item.nome}
                  </List.Item>
                ))}
              </List>
            </Text>
          ) : null}
        </Stack>
      </Modal>
      <Card
        shadow="sm"
        padding="sm"
        radius="md"
        withBorder
        style={{
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderColor: disciplina.concluida ? "green" : undefined,
          borderWidth: disciplina.concluida ? 2 : undefined,
        }}
        onClick={open}
      >
        {icon}

        <Group justify="space-between" mt="sm" mb="xs" style={{ flexGrow: 1 }}>
          <Text
            lineClamp={2}
            size="md"
            style={{
              textOverflow: "ellipsis",
            }}
          >
            {disciplina.nome}
          </Text>
        </Group>
        <Text
          size="sm"
          c="dimmed"
          style={{
            margin: "auto 0 0 0", // Isso faz o texto se alinhar ao fundo do Card.
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {disciplina.horas} h - {disciplina.creditos} c
        </Text>
      </Card>
    </>
  );
};

const Periodo = (periodo: IPeriodo) => {
  // se todos elementos de disciplinas possuem a propriedade concluida, retorna true
  const isPeriodoConcluido = periodo.disciplinas.every(
    (disciplina) => disciplina.concluida
  );

  //se pelo menos uma disciplina do periodo foi concluida, retorna true
  const isPeriodoEmAndamento = periodo.disciplinas.some(
    (disciplina) => disciplina.concluida
  );

  //color green se periodo concluido, yellow se em andamento e red se nao concluido
  const color = isPeriodoConcluido ? "green" : "indigo";

  const icon = isPeriodoConcluido ? undefined : (
    <IconX style={{ width: rem(16), height: rem(16) }} />
  );

  return (
    <Stack
      style={{ height: "100%" }} // Faz com que o Stack preencha todo o espaço vertical disponível
      gap="sm" // Espaçamento entre os Cards
    >
      <div>
        <Badge color={color} fullWidth radius="xs">
          {periodo.nome}
        </Badge>
      </div>
      {periodo.disciplinas.map((disciplina, index) => (
        <Disciplina key={index} {...disciplina} />
      ))}
    </Stack>
  );
};

const Fluxograma = (fluxograma: IFluxograma) => {
  return (
    <SimpleGrid
      cols={fluxograma.periodos.length}
      style={{ width: "100%", height: "100%" }}
    >
      {fluxograma.periodos.map((periodo, index) => (
        <Periodo key={index} {...periodo} />
      ))}
    </SimpleGrid>
  );
};

export default function Page(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description="Banco de conhecimento do Centro de Informática da UFPB">
      <MantineProvider>
        <Fluxograma
          titulo="Engenharia de Software"
          periodos={[
            {
              nome: "1º Período",
              disciplinas: [
                {
                  nome: "Cálculo 1",
                  horas: 60,
                  creditos: 4,
                  concluida: true,
                },
                {
                  nome: "Introdução à Computação",
                  horas: 60,
                  creditos: 4,
                  concluida: true,
                },
                {
                  nome: "Leitura e Produção de Textos",
                  horas: 60,
                  creditos: 4,
                  concluida: true,
                },
                {
                  nome: "Álgebra Vetorial e Geometria Analítica",
                  horas: 60,
                  creditos: 4,
                  concluida: true,
                },
                {
                  nome: "Metodologia Científica",
                  horas: 60,
                  creditos: 4,
                  concluida: true,
                },
              ],
            },
            {
              nome: "2º Período",
              disciplinas: [
                {
                  nome: "Cálculo 2",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Programação 1",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Teoria dos Grafos",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Física Geral",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Álgebra Linear",
                  horas: 60,
                  creditos: 4,
                },
              ],
            },
            {
              nome: "3º Período",
              disciplinas: [
                {
                  nome: "Cálculo 3",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Programação 2",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Estrutura de Dados",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Probabilidade e Estatística",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Física Experimental",
                  horas: 60,
                  creditos: 4,
                },
              ],
            },
            {
              nome: "4º Período",
              disciplinas: [
                {
                  nome: "Programação 3",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Banco de Dados",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Engenharia de Software 1",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Sistemas Operacionais",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Linguagens Formais e Autômatos",
                  horas: 60,
                  creditos: 4,
                },
              ],
            },
            {
              nome: "5º Período",
              disciplinas: [
                {
                  nome: "Engenharia de Software 2",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Compiladores",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Redes de Computadores",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Inteligência Artificial",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Projeto de Software",
                  horas: 60,
                  creditos: 4,
                },
              ],
            },
            {
              nome: "6º Período",
              disciplinas: [
                {
                  nome: "Engenharia de Software 3",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Sistemas Distribuídos",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Computação Gráfica",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Segurança de Dados",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Projeto de Software 2",
                  horas: 60,
                  creditos: 4,
                },
              ],
            },
            {
              nome: "7º Período",
              disciplinas: [
                {
                  nome: "Engenharia de Software 4",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Estágio Supervisionado",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Optativa 1",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Optativa 2",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Optativa 3",
                  horas: 60,
                  creditos: 4,
                },
              ],
            },
            {
              nome: "8º Período",
              disciplinas: [
                {
                  nome: "Projeto de Conclusão de Curso",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Optativa 4",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Optativa 5",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Optativa 6",
                  horas: 60,
                  creditos: 4,
                },
                {
                  nome: "Optativa 7",
                  horas: 60,
                  creditos: 4,
                },
              ],
            },
          ]}
        />
      </MantineProvider>
    </Layout>
  );
}
