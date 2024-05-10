namespace ReDo.server.Endpoints;

public static class MemberEndpoints {
    public static void MapMemberEndpoints(this WebApplication app) {
        app.MapGet("/members", () => {
                    IEnumerable<string> members = ["kålle", "ada"];
                    return members;
                }
            )
            .WithOpenApi();


        app.MapGet("/member", () => {
                    var member = new Member("kålle", 21);
                    return member;
                }
            )
            .WithOpenApi();
    }
}

public record Member(string Name, int Age);