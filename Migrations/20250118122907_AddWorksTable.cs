using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Projekti.Migrations
{
    /// <inheritdoc />
    public partial class AddWorksTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Works",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Artist = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    creation_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    creation_date_text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Era = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Works", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Works",
                columns: new[] { "Id", "Artist", "Category", "creation_date", "creation_date_text", "Description", "Era", "Name" },
                values: new object[] { 1, "Raphael", "Fresco", new DateTime(1510, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "1510-01-01", "A fresco representing philosophy and knowledge.", "Renaissance", "The School of Athens" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Works");
        }
    }
}
