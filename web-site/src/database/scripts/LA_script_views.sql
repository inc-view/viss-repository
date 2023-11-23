-- view para o primeiro gráfico
CREATE VIEW vwGrafProcIlicitoPorDia AS
	SELECT count(dataHora), dataHora FROM processoIlicito GROUP BY dataHora;
    
-- KPI dos processos que mais tentaram acessar (de todo o tempo)
CREATE VIEW vwKPIMaisAcessados AS
SELECT count(p.dataHora) AS contagem, s.nomeSoftware FROM processoIlicito AS p 
	JOIN softwarePermitido AS sp ON sp.idSoftwarePermitido = p.fkSoftware 
    JOIN software AS s ON s.idSoftware = sp.fkSoftware GROUP BY s.nomeSoftware ORDER BY contagem DESC LIMIT 3;
    


